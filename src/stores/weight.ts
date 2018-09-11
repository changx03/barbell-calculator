import { action, computed, observable } from 'mobx';
import { modWeight, toKg, toLb } from './utils';

export enum Unit {
  Kg = 1,
  Lb,
}

export const APP_NAME = 'weightRackingCalculator';

export interface StoredData {
  allowMix: boolean;
  barbellWeight: number;
  unit: Unit;
  weightKg: number;
  platesKg: number[];
  platesLb: number[];
}

export interface Plate {
  weight: number;
}
export interface PlateAvailableListItem extends Plate {
  isAvailable: boolean;
}

export interface PlateCountListItem extends Plate {
  count: number;
  unit: Unit;
}

export class WeightStore {
  // ROGUE CALIBRATED KG STEEL PLATES https://www.rogueaustralia.com.au/rogue-calibrated-kg-steel-plates-au
  static plateWeightsKg: number[] = [25, 20, 15, 10, 5, 2.5, 1.25, 0.5, 0.25, 0.125];
  // ROGUE OLYMPIC PLATES https://www.roguefitness.com/rogue-olympic-plates
  static plateWeightsLb: number[] = [55, 45, 35, 25, 10, 5, 2.5, 1.25, 1, 0.75, 0.5, 0.25];

  @observable
  _weightKg: number; // We don't want to show more than 2dp; use computed value instead

  @observable
  allowMix: boolean = false;

  @observable
  displayUnit: Unit = Unit.Kg;

  @observable
  platesKg = new Map<number, boolean>();

  @observable
  platesLb = new Map<number, boolean>();

  @observable
  barbellWeight: number = 20;

  constructor() {
    WeightStore.plateWeightsKg.forEach(i => {
      i >= 1.25 && i <= 20 ? this.platesKg.set(i, true) : this.platesKg.set(i, false);
    });
    WeightStore.plateWeightsLb.forEach(i => {
      i <= 1 ? this.platesLb.set(i, true) : this.platesLb.set(i, false);
    });
    this.loadSetupFromStorage();
  }

  @computed
  get weight(): number {
    if (isNaN(this._weightKg) || this._weightKg === null || this._weightKg < 0) {
      return 0;
    }
    return this.isUsingMetric ? Math.round(this._weightKg * 10) / 10 : Math.round(toLb(this._weightKg));
  }

  @computed
  get plateListKg(): PlateAvailableListItem[] {
    if (!this.platesKg || this.platesKg.size === 0) {
      return [];
    }
    return Array.from(this.platesKg).map(p => ({
      weight: p[0],
      isAvailable: p[1],
    }));
  }

  @computed
  get plateListLb(): PlateAvailableListItem[] {
    if (!this.platesKg || this.platesLb.size === 0) {
      return [];
    }
    return Array.from(this.platesLb).map(p => ({
      weight: p[0],
      isAvailable: p[1],
    }));
  }

  @computed
  get isUsingMetric(): boolean {
    return this.displayUnit === Unit.Kg;
  }

  @computed
  get plateCountList(): PlateCountListItem[] {
    let leftover = this.weight - (this.isUsingMetric ? this.barbellWeight : toLb(this.barbellWeight));
    if (this.weight <= 0 || this.platesKg.size + this.platesLb.size === 0 || isNaN(leftover) || leftover <= 0) {
      return [];
    }
    const result: PlateCountListItem[] = [];
    const majorWeights = (this.isUsingMetric
      ? this.plateListKg.filter(i => i.isAvailable)
      : this.plateListLb.filter(i => i.isAvailable)
    ).map(i => i.weight); // the plates for the scale we are using
    const minorWeights = (!this.isUsingMetric
      ? this.plateListKg.filter(i => i.isAvailable)
      : this.plateListLb.filter(i => i.isAvailable)
    ).map(i => i.weight); // the plates for another scale

    for (let i = 0; i < majorWeights.length; i++) {
      const { count, leftover: currentLeftover } = modWeight(leftover, majorWeights[i]);
      if (count > 0) {
        result.push({ count, weight: majorWeights[i], unit: this.isUsingMetric ? Unit.Kg : Unit.Lb });
        leftover = currentLeftover;
      }
    }

    if (leftover !== 0) {
      if (this.allowMix) {
        // when mixed is allowed, we try to fill the weights with another scale
        for (let i = 0; i < minorWeights.length; i++) {
          // minorWeights always uses different scale
          const plateWeight = this.isUsingMetric ? toKg(minorWeights[i]) : toLb(minorWeights[i]);
          const { count, leftover: currentLeftover } = modWeight(leftover, plateWeight);
          if (count > 0) {
            result.push({ count, weight: minorWeights[i], unit: this.isUsingMetric ? Unit.Lb : Unit.Kg }); // opposite scale
            leftover = currentLeftover;
          }
        }
      }

      // check leftover again
      if (leftover !== 0) {
        result.push({ count: 0, weight: leftover, unit: this.isUsingMetric ? Unit.Kg : Unit.Lb });
      }
    }
    return result;
  }

  saveSetupToStorage() {
    // serverless app, use local storage
    const avaliablePlatesKg = Array.from(this.platesKg)
      .filter(w => w[1])
      .map(w => w[0]);
    const avaliablePlatesLb = Array.from(this.platesLb)
      .filter(w => w[1])
      .map(w => w[0]);
    const storeData: StoredData = {
      weightKg: this._weightKg,
      allowMix: this.allowMix,
      unit: this.displayUnit,
      platesKg: avaliablePlatesKg,
      platesLb: avaliablePlatesLb,
      barbellWeight: this.barbellWeight,
    };
    window.localStorage.setItem(APP_NAME, JSON.stringify(storeData));
  }

  @action
  togglePlate(weightKey: number, unit: Unit) {
    if (unit === Unit.Kg && this.platesKg.has(weightKey)) {
      this.platesKg.set(weightKey, !this.platesKg.get(weightKey));
    } else if (unit === Unit.Lb && this.platesLb.has(weightKey)) {
      this.platesLb.set(weightKey, !this.platesLb.get(weightKey));
    }
  }

  @action
  loadSetupFromStorage() {
    if (!!window.localStorage.getItem(APP_NAME)) {
      const storedData = JSON.parse(window.localStorage.getItem(APP_NAME) as string);
      const { allowMix, platesKg, platesLb, unit, weightKg, barbellWeight } = storedData;
      this._weightKg = weightKg;
      this.allowMix = allowMix;
      platesKg.forEach((i: number) => {
        this.platesKg.set(i, true);
      });
      platesLb.forEach((i: number) => {
        this.platesLb.set(i, true);
      });
      this.displayUnit = unit;
      this.barbellWeight = barbellWeight;
    }
  }

  @action
  toggleAllowMix = () => {
    this.allowMix = !this.allowMix;
  };

  @action
  toggleUnitSystem = () => {
    this.displayUnit === Unit.Kg ? (this.displayUnit = Unit.Lb) : (this.displayUnit = Unit.Kg);
  };

  @action
  setWeight = (value: number) => {
    this._weightKg = value;
  };

  @action
  setBarbellWeight = (value: number) => {
    this.barbellWeight = value;
  };
}
