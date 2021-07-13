import Dexie from 'dexie';

export class DexieService extends Dexie {
  constructor() {
    super('PlantDatabase');
    this.version(6).stores({
      plants: '++plantId, pictureId, lastWateredDate, daysBtwnWatering',
    });
  }
}