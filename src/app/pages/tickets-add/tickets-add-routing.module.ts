import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketsAddPage } from './tickets-add.page';

const routes: Routes = [
  {
    path: '',
    component: TicketsAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsAddPageRoutingModule {}
