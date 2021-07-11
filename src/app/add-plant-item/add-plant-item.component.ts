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
  @ViewChild("uploadImg") uploadedPicture;

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

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      // this.previewPictureSrc = reader.result;
      // this.previewImg.nativeElement.src = reader.result.toString();
      this.plant.pictureId = reader.result.toString();
    });

    reader.readAsDataURL(this.selectedFile);
    //this.plant.pictureId = this.selectedFile;
    //this.plant.pictureId = this.getBase64Image(this.previewImg.nativeElement);
  }

  private getBase64Image(img): string {
    let canvas = document.createElement("canvas");
    // canvas.width = img.width;
    // canvas.height = img.height;
    canvas.width = 100;
    canvas.height = 100;
    let context = canvas.getContext("2d");
    context.drawImage(img, 0, 0, 100, 100);
    const dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  get imgSrc() {
    return this.uploadedPicture.src;
  }

  onSave() {
    this.save.emit(this.plant);
  }

  onCloseClicked(): void {
    this.plant = new Plant();
    this.closeBtnClicked.emit();
  }

}
