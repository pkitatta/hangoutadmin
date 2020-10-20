import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HangoutServiceCreationPageRoutingModule } from './hangout-service-creation-routing.module';

import { HangoutServiceCreationPage } from './hangout-service-creation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HangoutServiceCreationPageRoutingModule
  ],
  declarations: [HangoutServiceCreationPage]
})
export class HangoutServiceCreationPageModule {}
