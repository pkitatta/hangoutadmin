import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuImageModalPageRoutingModule } from './menu-image-modal-routing.module';

import { MenuImageModalPage } from './menu-image-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuImageModalPageRoutingModule
  ],
  declarations: [MenuImageModalPage]
})
export class MenuImageModalPageModule {}
