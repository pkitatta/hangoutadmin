import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HangoutDetailPage } from './hangout-detail.page';

const routes: Routes = [
  {
    path: '',
    component: HangoutDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HangoutDetailPageRoutingModule {}
