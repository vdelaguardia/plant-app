import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Plant } from '../models/plant.model';
import { PlantService } from '../services/plant.service';

@Component({
  selector: 'add-plant-item',
  templateUrl: './add-plant-item.component.html',
  styleUrls: ['./add-plant-item.component.less']
})
export class AddPlantItemComponent implements OnInit {

  @ViewChild("previewImg") previewImg;

  @Output("closeBtnClicked") closeBtnClicked: EventEmitter<void> = new EventEmitter();
  @Output("save") save: EventEmitter<Plant> = new EventEmitter();
  
  @Input() plant: Plant = new Plant();

  selectedFile: File;
  displayImage: boolean = false;
  previewPictureSrc: string | ArrayBuffer;
  initialPlants: Plant[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  // Reads and loads image file
  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      this.plant.pictureId = reader.result.toString();
    });

    reader.readAsDataURL(this.selectedFile);
  }

  onSave() {
    this.save.emit(this.plant);
  }

  onCloseClicked(): void {
    this.closeBtnClicked.emit();
  }

}
