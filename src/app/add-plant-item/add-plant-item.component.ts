import { Component, OnInit, ViewChild } from '@angular/core';
import { Plant } from '../models/plant.model';

@Component({
  selector: 'add-plant-item',
  templateUrl: './add-plant-item.component.html',
  styleUrls: ['./add-plant-item.component.less']
})
export class AddPlantItemComponent implements OnInit {

  @ViewChild("previewImg") previewImg;
  @ViewChild("uploadImg") uploadedPicture;

  plant: Plant = new Plant();
  selectedFile: File;
  displayImage: boolean = false;
  previewPictureSrc: string | ArrayBuffer;
  initialPlants: Plant[] = [{name: "PlantName", daysBtwnWatering: 9, pictureId: null, waterStartDate: new Date()}];

  constructor() { }

  ngOnInit(): void {
    const request = indexedDB.open("PlantDatabase", 3);

    request.onerror = (event: any) => {
      console.error("IndexedDB was not given permission.");
      console.error(event);
    }

    request.onsuccess = (event: any) => {
      console.log("Successfully opened database");
      const database = request.result;
      // const objectStore = database.createObjectStore("plants", { keyPath: "plantId", autoIncrement: true });
      // console.log("created objstore" + objectStore);
      // objectStore.transaction.oncomplete = (event) => {
      //   const plantObjStore = database.transaction("plants", "readwrite").objectStore("plants");
      //   this.initialPlants.forEach( plant => {
      //     plantObjStore.add(plant);
      //     console.log("Added: " + plant);
      //   });
      // }
 
      // database.onerror = (event: any) => {
      //   console.error("Database error: " + event.target.errorCode);
      //   console.error(event);
      // }
    }

    request.onupgradeneeded = (event: any) => {
      console.log("Upgrade database");
      const database = request.result;
      const objectStore = database.createObjectStore("plants", { keyPath: "plantId", autoIncrement: true });
      objectStore.transaction.oncomplete = (event) => {
        const plantObjStore = database.transaction("plants", "readwrite").objectStore("plants");
        this.initialPlants.forEach( plant => {
          plantObjStore.add(plant);
        });
      }
 
      database.onerror = (event: any) => {
        console.error("Database error: " + event.target.errorCode);
        console.error(event);
      }
      
    }
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
    const request = indexedDB.open("PlantDatabase");
      let database;
      request.onsuccess = (event) => {
        database = request.result;
        const transaction = database.transaction("plants", "readwrite");
        this.handleTransactionCompleteAndError(transaction);
        const objectStore = transaction.objectStore("plants");
        const addRequest = objectStore.add(this.plant);
        addRequest.onsuccess = (event) => {
          console.log("Added: " + event.target);
        } 
      }
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

}
