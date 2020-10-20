import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarServicePageRoutingModule } from './bar-service-routing.module';

import { BarServicePage } from './bar-service.page';
import {SharedModule} from '../../shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BarServicePageRoutingModule,
        SharedModule
    ],
  declarations: [BarServicePage]
})
export class BarServicePageModule {}
