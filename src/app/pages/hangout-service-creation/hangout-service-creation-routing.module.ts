import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HangoutServiceCreationPage } from './hangout-service-creation.page';

const routes: Routes = [
  {
    path: '',
    component: HangoutServiceCreationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HangoutServiceCreationPageRoutingModule {}
