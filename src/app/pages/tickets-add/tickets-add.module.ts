import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketsAddPageRoutingModule } from './tickets-add-routing.module';

import { TicketsAddPage } from './tickets-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketsAddPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TicketsAddPage]
})
export class TicketsAddPageModule {}
