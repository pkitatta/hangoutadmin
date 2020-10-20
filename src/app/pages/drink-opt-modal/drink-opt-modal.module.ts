import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrinkOptModalPageRoutingModule } from './drink-opt-modal-routing.module';

import { DrinkOptModalPage } from './drink-opt-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrinkOptModalPageRoutingModule
  ],
  declarations: [DrinkOptModalPage]
})
export class DrinkOptModalPageModule {}
