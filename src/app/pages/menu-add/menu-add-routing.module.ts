import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuAddPage } from './menu-add.page';

const routes: Routes = [
  {
    path: '',
    component: MenuAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuAddPageRoutingModule {}
