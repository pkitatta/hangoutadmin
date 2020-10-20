import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HangoutEditPageRoutingModule } from './hangout-edit-routing.module';

import { HangoutEditPage } from './hangout-edit.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HangoutEditPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [HangoutEditPage]
})
export class HangoutEditPageModule {}
