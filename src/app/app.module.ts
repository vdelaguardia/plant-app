import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { PlantItemComponent } from './plant-item/plant-item.component';
import { AddPlantItemComponent } from './add-plant-item/add-plant-item.component';
import { FormsModule } from '@angular/forms';
import { InventoryComponent } from './inventory/inventory.component';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { RouterModule } from '@angular/router';
import { DexieService } from './services/dexie.service';
import { PlantService } from './services/plant.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PlantItemComponent,
    AddPlantItemComponent,
    InventoryComponent,
    HomeComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'calendar', component: CalendarComponent },
    ])
  ],
  exports: [RouterModule],
  providers: [
    DexieService,
    PlantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
