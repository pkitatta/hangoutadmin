import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HangoutImageModalPageRoutingModule } from './hangout-image-modal-routing.module';

import { HangoutImageModalPage } from './hangout-image-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HangoutImageModalPageRoutingModule
  ],
  declarations: [HangoutImageModalPage]
})
export class HangoutImageModalPageModule {}
