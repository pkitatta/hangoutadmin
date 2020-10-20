import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HotelServicePage } from './hotel-service.page';

const routes: Routes = [
  {
    path: '',
    component: HotelServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotelServicePageRoutingModule {}
