import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HangoutImageModalPage } from './hangout-image-modal.page';

const routes: Routes = [
  {
    path: '',
    component: HangoutImageModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HangoutImageModalPageRoutingModule {}
