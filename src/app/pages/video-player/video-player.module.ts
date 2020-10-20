import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoPlayerPageRoutingModule } from './video-player-routing.module';

import { VideoPlayerPage } from './video-player.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoPlayerPageRoutingModule
  ],
  declarations: [VideoPlayerPage]
})
export class VideoPlayerPageModule {}
