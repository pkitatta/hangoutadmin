import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImagePreviewPageRoutingModule } from './image-preview-routing.module';

import { ImagePreviewPage } from './image-preview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagePreviewPageRoutingModule
  ],
  declarations: []
})
export class ImagePreviewPageModule {}
