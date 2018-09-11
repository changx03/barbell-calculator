export function modWeight(weight: number, plate: number): { leftover: number; count: number } {
  return {
    leftover: weight % (plate * 2),
    count: Math.floor(weight / (plate * 2)),
  };
}

export function toKg(lb: number): number {
  return lb * 0.453592;
}

export function toLb(kg: number): number {
  return kg * 2.204623;
}

export function weightRounding(weight: number, isMetric: boolean): number {
  return isMetric ? Math.round(weight * 100) / 100 : Math.round(weight * 10) / 10;
}

export function parseNumber(value: string): number | null {
  return value === '' ? null : parseFloat(value);
}
