import { Component, OnInit } from '@angular/core';
import { Plant } from '../models/plant.model';
import { PlantService } from '../services/plant.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.less']
})
export class InventoryComponent implements OnInit {

  plants: Plant[] = [];
  showModifyPlantModal: boolean = false;
  selectedPlant: Plant = new Plant();

  constructor(private plantSvc: PlantService) { }

  ngOnInit(): void {
    this.plantSvc.getAll().then((plants) => {
      console.log("Obtained all plants");
      this.plants = plants;
    })
  }

  toggleModifyPlantModal(): void {
    this.showModifyPlantModal = !this.showModifyPlantModal;
  }

  onDeleteClicked(id: number): void {
    this.plantSvc.remove(id).then(() => {
      this.plants = this.plants.filter(plant => plant.plantId !== id);
      console.log("Removed plant with id: " + id);
    });
  }

  // If the incoming plant has an id already, modify it; otherwise, create a new plant
  onPlantSaved(plant: Plant): void {
    if (!!plant.plantId) {
      this.modifyPlant(plant);
    } else {
      this.addPlant(plant);
    }
    this.toggleModifyPlantModal();
  }

  addPlant(plant: Plant): void {
    this.plantSvc.add(plant).then(id => {
      this.plants = [...this.plants, Object.assign({}, plant, { id })];
      console.log("Added plant with id: " + id);
      this.selectedPlant = new Plant();
    });
  }

  modifyPlant(plant: Plant): void {
    this.plantSvc.update(plant.plantId, plant).then(id => {
      this.plants = this.plants.filter(plant => plant.plantId !== id);
      this.plants = [...this.plants, Object.assign({}, plant, { id })];
      console.log("Modified plant with id: " + id);
    });
    this.toggleModifyPlantModal();
  }

  onEditClicked(plant: Plant): void {
    this.selectedPlant = plant;
    this.toggleModifyPlantModal();
  }

}
