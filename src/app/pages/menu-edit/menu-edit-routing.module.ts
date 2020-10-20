import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuEditPage } from './menu-edit.page';

const routes: Routes = [
  {
    path: '',
    component: MenuEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuEditPageRoutingModule {}
