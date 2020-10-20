import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrinkAddPage } from './drink-add.page';

const routes: Routes = [
  {
    path: '',
    component: DrinkAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrinkAddPageRoutingModule {}
