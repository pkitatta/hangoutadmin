import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminAddPageRoutingModule } from './admin-add-routing.module';

import { AdminAddPage } from './admin-add.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AdminAddPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [AdminAddPage]
})
export class AdminAddPageModule {}
