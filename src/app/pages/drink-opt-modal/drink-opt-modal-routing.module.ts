import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrinkOptModalPage } from './drink-opt-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DrinkOptModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrinkOptModalPageRoutingModule {}
