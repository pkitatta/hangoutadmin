import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TakeawayServicePage } from './takeaway-service.page';

const routes: Routes = [
  {
    path: '',
    component: TakeawayServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TakeawayServicePageRoutingModule {}
