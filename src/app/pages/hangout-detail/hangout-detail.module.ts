import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HangoutDetailPageRoutingModule } from './hangout-detail-routing.module';

import { HangoutDetailPage } from './hangout-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HangoutDetailPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [HangoutDetailPage]
})
export class HangoutDetailPageModule {}
