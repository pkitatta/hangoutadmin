import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketsDetailPage } from './tickets-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TicketsDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsDetailPageRoutingModule {}
