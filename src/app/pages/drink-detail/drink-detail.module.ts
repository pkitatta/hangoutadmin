import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrinkDetailPageRoutingModule } from './drink-detail-routing.module';

import { DrinkDetailPage } from './drink-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrinkDetailPageRoutingModule
  ],
  declarations: [DrinkDetailPage]
})
export class DrinkDetailPageModule {}
