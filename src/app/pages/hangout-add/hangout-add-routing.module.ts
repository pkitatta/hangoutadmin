import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HangoutAddPage } from './hangout-add.page';

const routes: Routes = [
  {
    path: '',
    component: HangoutAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HangoutAddPageRoutingModule {}
