import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminAddPage } from './admin-add.page';

const routes: Routes = [
  {
    path: '',
    component: AdminAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminAddPageRoutingModule {}
