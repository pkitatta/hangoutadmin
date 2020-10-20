import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarServicePage } from './bar-service.page';

const routes: Routes = [
  {
    path: '',
    component: BarServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarServicePageRoutingModule {}
