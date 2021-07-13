import { Component, Input, OnInit } from '@angular/core';
import { Plant } from '../models/plant.model';

@Component({
  selector: 'simple-profile',
  templateUrl: './simple-profile.component.html',
  styleUrls: ['./simple-profile.component.less']
})
export class SimpleProfileComponent implements OnInit {

  @Input("plant") plant: Plant;

  constructor() { }

  ngOnInit(): void {
  }

}
