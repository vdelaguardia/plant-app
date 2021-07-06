import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlantItemComponent } from './add-plant-item.component';

describe('AddPlantItemComponent', () => {
  let component: AddPlantItemComponent;
  let fixture: ComponentFixture<AddPlantItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlantItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlantItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
