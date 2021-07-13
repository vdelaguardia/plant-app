import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Plant } from '../models/plant.model';

@Component({
  selector: 'app-plant-item',
  templateUrl: './plant-item.component.html',
  styleUrls: ['./plant-item.component.less']
})
export class PlantItemComponent implements OnInit {

  @Input("plant") plant: Plant;

  @Output("editClicked") editClicked: EventEmitter<Plant> = new EventEmitter(); 
  @Output("deleteClicked") deleteClicked: EventEmitter<number> = new EventEmitter(); 
  constructor() { }

  ngOnInit(): void {
  }

  onDeleteClicked() {
    this.deleteClicked.emit(this.plant.plantId);
  }

  onEditClicked() {
    this.editClicked.emit(this.plant);
  }

}
