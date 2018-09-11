import { action, observable } from 'mobx';

export class AppStore {
  @observable
  currentPageIndex: number = 0;

  @observable
  isBarbellWeightModalOpen: boolean = false;

  @observable
  showInfo: boolean = true;

  @action
  setCurrentPage = (value: number) => {
    this.currentPageIndex = value;
  };

  @action
  setBarbellWeightModal = (isOpen: boolean) => {
    this.isBarbellWeightModalOpen = isOpen;
  };

  @action
  closeInfo = () => {
    this.showInfo = false;
  };
}
