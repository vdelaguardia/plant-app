import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Plant } from '../models/plant.model';

import { SimpleProfileComponent } from './simple-profile.component';

describe('SimpleProfileComponent', () => {
  let component: SimpleProfileComponent;
  let fixture: ComponentFixture<SimpleProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleProfileComponent);
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
