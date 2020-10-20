import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketsEditPage } from './tickets-edit.page';

const routes: Routes = [
  {
    path: '',
    component: TicketsEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsEditPageRoutingModule {}
