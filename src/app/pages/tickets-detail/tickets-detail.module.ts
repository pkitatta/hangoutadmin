import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketsDetailPageRoutingModule } from './tickets-detail-routing.module';

import { TicketsDetailPage } from './tickets-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketsDetailPageRoutingModule
  ],
  declarations: [TicketsDetailPage]
})
export class TicketsDetailPageModule {}
