import Dexie from 'dexie';

export class DexieService extends Dexie {
  constructor() {
    super('PlantDatabase');
    this.version(5).stores({
      plants: '++plantId, pictureId, waterStartDate, daysBtwnWatering',
    });
  }
}