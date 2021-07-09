import { Component, OnInit } from '@angular/core';
import { Plant } from '../models/plant.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.less']
})
export class InventoryComponent implements OnInit {

  plants: Plant[] = [];
  showModifyPlantModal: boolean = false;
  selectedPlant: Plant = new Plant();

  constructor() { }

  ngOnInit(): void {
    this.refreshPlants();
  }

  refreshPlants(): void {
    const request = indexedDB.open("PlantDatabase", 3);
    request.onerror = (event) => {
      console.error("Error opening db: ");
      console.dir(event);
    }
    request.onsuccess = (event) => {
      console.log("Success opening db!");
      const db = request.result;
      const objStore = db.transaction("plants").objectStore("plants");
      console.log(objStore);
      this.plants = [];
      objStore.openCursor().onsuccess = (event: any) => {
        const cursor = event.target.result;
        if (cursor) {
          console.log(cursor.value);
          this.plants = [...this.plants, cursor.value];
          cursor.continue();
        } else {
          console.log("No more entries.");
        }
        console.log(this.plants);
      }
    }
  }

  modifyPlantModal(): void {
    this.showModifyPlantModal = !this.showModifyPlantModal;
  }

  onDeleteClicked(id: number): void {
    const request = indexedDB.open("PlantDatabase", 3);
    request.onerror = (event) => {
      console.error("Error opening db: ");
      console.dir(event);
    }
    request.onsuccess = (event) => {
      console.log("Success opening db!");
      const db = request.result;
      const objStore = db.transaction("plants", "readwrite").objectStore("plants");
      const plantRequest = objStore.delete(id);
      // const plantRequest = objStore.getAll();
      plantRequest.onsuccess = (event: any) => {
        const plant = plantRequest.result;
        console.log("Deleted: ");
        console.log(plant);
        this.refreshPlants();
      }
      plantRequest.onerror = (event: any) => {
        console.error("Error getting plant");
        console.log(event);
      }
    }
  }

  onPlantAdded(): void {
    this.refreshPlants();
    this.modifyPlantModal();
  }

  onEditClicked(plant: Plant): void {
    this.selectedPlant = plant;
    this.modifyPlantModal();
  }

}
