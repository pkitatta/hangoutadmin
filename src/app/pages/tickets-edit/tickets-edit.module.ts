import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketsEditPageRoutingModule } from './tickets-edit-routing.module';

import { TicketsEditPage } from './tickets-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketsEditPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TicketsEditPage]
})
export class TicketsEditPageModule {}
