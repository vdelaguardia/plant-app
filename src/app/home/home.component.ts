import { Component, OnInit } from '@angular/core';
import { Plant } from '../models/plant.model';
import { PlantService } from '../services/plant.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  plants: Array<Plant> = [];

  constructor(private plantSvc: PlantService) { }

  ngOnInit(): void {
    this.plantSvc.getAll().then((plants) => {
      this.plants = this.getPlantsThatNeedWater(plants);
    });
  }

  getPlantsThatNeedWater(plants: Array<Plant>): Array<Plant> {
    // converts daysBtwnWatering to seconds, checks if more seconds have passed than days between watering, if yes - need to water
    return plants.filter(plant => plant.daysBtwnWatering * 86400 <= (new Date().valueOf() - new Date(plant.lastWateredDate).valueOf())/1000);
  }

  onPlantWatered(plant: Plant): void {
    plant.lastWateredDate = new Date().toDateString();
  }
}
