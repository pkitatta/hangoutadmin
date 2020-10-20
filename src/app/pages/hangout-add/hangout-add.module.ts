import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HangoutAddPageRoutingModule } from './hangout-add-routing.module';

import { HangoutAddPage } from './hangout-add.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HangoutAddPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [HangoutAddPage]
})
export class HangoutAddPageModule {}
