import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HotelServicePageRoutingModule } from './hotel-service-routing.module';

import { HotelServicePage } from './hotel-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HotelServicePageRoutingModule
  ],
  declarations: [HotelServicePage]
})
export class HotelServicePageModule {}
