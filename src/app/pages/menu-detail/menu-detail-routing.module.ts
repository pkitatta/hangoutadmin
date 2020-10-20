import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuDetailPage } from './menu-detail.page';

const routes: Routes = [
  {
    path: '',
    component: MenuDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuDetailPageRoutingModule {}
