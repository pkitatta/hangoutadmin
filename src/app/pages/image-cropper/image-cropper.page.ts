import { Component, Input, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {LoadingProviderService} from '../../services/loading-provider.service';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {ImageService} from '../../api/image.service';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.page.html',
  styleUrls: ['./image-cropper.page.scss'],
})
export class ImageCropperPage implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  imageURL: string;
  @Input() type;
  @Input() hangoutId;
  constructor(
      private imgService: ImageService,
      private modalController: ModalController,
      public navParams: NavParams,
      private loading: LoadingProviderService
  ) { }

  ngOnInit() {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }
  cropperReady() {
    // console.log('Cropper ready', sourceImageDimensions);
  }
  loadImageFailed() {
    console.log('Load failed');
  }
  async uploadImg() {
    await this.loading.show();
    console.log('image: ' + this.croppedImage);
    const data = {
      hangoutId: this.hangoutId,
      photo: this.croppedImage,
      type: this.type
    };
    await this.imgService.uploadCoverPhoto(data, this.type).subscribe((res: any) => {
      console.log(res);
      if (res.data) {
        this.modalController.dismiss({
          new: true,
          imgId: res.data.id,
          data: this.type === 'cover' ? res.data.file : res.data.thumb // this is data: data
        });
        this.loading.hide();
      }
    }, error => {
      console.log(error);
      this.loading.hide();
    });
  }
  dismissModal() {
    this.modalController.dismiss({
      new: false,
      data: null
    });
  }

}
