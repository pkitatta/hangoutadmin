import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TakeawayServicePageRoutingModule } from './takeaway-service-routing.module';

import { TakeawayServicePage } from './takeaway-service.page';
import {SharedModule} from "../../shared.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TakeawayServicePageRoutingModule,
        SharedModule
    ],
  declarations: [TakeawayServicePage]
})
export class TakeawayServicePageModule {}
