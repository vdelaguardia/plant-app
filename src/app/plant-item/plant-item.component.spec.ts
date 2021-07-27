import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Plant } from '../models/plant.model';

import { PlantItemComponent } from './plant-item.component';

describe('PlantItemComponent', () => {
  let component: PlantItemComponent;
  let fixture: ComponentFixture<PlantItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantItemComponent);
    component = fixture.componentInstance;
    component.plant = plant;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

const plant: Plant = {
  plantId: 0,
  pictureId: "",
  name: "plant",
  lastWateredDate: new Date().toDateString(),
  daysBtwnWatering: 1
};
