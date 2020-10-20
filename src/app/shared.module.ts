import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import {ImageCropperPage} from './pages/image-cropper/image-cropper.page';
import {GroupByCategoryPipe} from './pipes/group-by';
import {ImagePreviewPage} from './pages/image-preview/image-preview.page';
import {MediaGroupPipe} from './pipes/media-group';
import {FullDateMilliPipe} from './pipes/fulldate';
import {CommonModule} from '@angular/common';
import {AppModule} from './app.module';

@NgModule({
    imports: [
        // CommonModule,
        // AppModule
    ],
    declarations: [
        // ImageCropperPage,
        GroupByCategoryPipe,
        // ImagePreviewPage,
        // MediaGroupPipe,
        FullDateMilliPipe
    ],
    exports: [GroupByCategoryPipe, FullDateMilliPipe]
})
export class SharedModule {}
