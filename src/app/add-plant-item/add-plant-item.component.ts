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
  @Output("")
  @Output("plantAdded") onPlantAdded: EventEmitter<Plant> = new EventEmitter();
  
  @Input() plant: Plant = new Plant();
  selectedFile: File;
  displayImage: boolean = false;
  previewPictureSrc: string | ArrayBuffer;
  initialPlants: Plant[] = [];

  constructor( private plantSvc: PlantService ) { }

  ngOnInit(): void {
  }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      this.previewPictureSrc = reader.result;
      this.previewImg.nativeElement.src = reader.result.toString();
    });

    reader.readAsDataURL(this.selectedFile);
    this.plant.pictureId = this.getBase64Image(this.previewImg.nativeElement);
  }

  onUploadClick() {
    try {
      
    }
    catch(e) {
      console.log("Error: " + e);
    }
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

  onShowClicked() {
    const newImg = new Image();
    newImg.src = localStorage.getItem('picture');
    this.uploadedPicture = newImg;
    this.displayImage = !this.displayImage;
  }

  get imgSrc() {
    return this.uploadedPicture.src;
  }

  addToStore() {
    // const request = indexedDB.open("PlantDatabase");
    // let database;
    // request.onsuccess = (event) => {
    //   database = request.result;
    //   const transaction = database.transaction("plants", "readwrite");
    //   this.handleTransactionCompleteAndError(transaction);
    //   const objectStore = transaction.objectStore("plants");
    //   const addRequest = objectStore.add(this.plant);
    //   addRequest.onsuccess = (event) => {
    //     console.log("Added: " + event.target);
    //     this.onPlantAdded.emit();
    //   }
    // }
    // this.plantSvc.add(this.plant)
    //   .then( id => {

    // });
    this.onPlantAdded.emit(this.plant);
  }

  printStore() {
    const request = indexedDB.open("PlantDatabase");
    let database;
    request.onsuccess = (event) => {
      database = request.result;
      const transaction = database.transaction("plants", "readonly");
      this.handleTransactionCompleteAndError(transaction);
      const objectStore = transaction.objectStore("plants");
      const getRequest = objectStore.get(1);
      console.log("Retrieved Object:");
      console.dir(getRequest);
    }
  }

  private handleTransactionCompleteAndError(transaction: IDBTransaction) {
    transaction.onerror = (event) => {
      console.error("Transaction error: " + event);
    }
    transaction.oncomplete = (event) => {
      console.log("Transaction Complete! " + event);
    }
  }

  onCloseClicked(): void {
    this.plant = new Plant();
    this.closeBtnClicked.emit();
  }

}