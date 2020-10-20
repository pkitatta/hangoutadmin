import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MediaPageRoutingModule } from './media-routing.module';

import { MediaPage } from './media.page';
import {SharedModule} from '../../shared.module';
import {MediaGroupPipe} from '../../pipes/media-group';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MediaPageRoutingModule,
        SharedModule
    ],
    declarations: [MediaPage, MediaGroupPipe]
})
export class MediaPageModule {}
