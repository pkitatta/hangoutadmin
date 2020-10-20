import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrinkAddPageRoutingModule } from './drink-add-routing.module';

import { DrinkAddPage } from './drink-add.page';
import {SharedModule} from '../../shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DrinkAddPageRoutingModule,
        SharedModule
    ],
  declarations: [DrinkAddPage]
})
export class DrinkAddPageModule {}
