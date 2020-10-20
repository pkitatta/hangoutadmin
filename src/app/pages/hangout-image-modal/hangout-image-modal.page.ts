import {Component, Input, OnInit} from '@angular/core';
import {ActionSheetController, ModalController, NavController, NavParams} from '@ionic/angular';
import {LoadingProviderService} from '../../services/loading-provider.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ImageCropperPage} from '../image-cropper/image-cropper.page';
import {ImageService} from '../../api/image.service';

@Component({
  selector: 'app-hangout-image-modal',
  templateUrl: './hangout-image-modal.page.html',
  styleUrls: ['./hangout-image-modal.page.scss'],
})
export class HangoutImageModalPage implements OnInit {
  @Input() img;
  @Input() type;
  @Input() hangoutId;
  @Input() adminLevel;
  @Input() imgId;
  private callUpload;
  private callDelete;
  showNavBar = true;
  public image;
  private admin;
  new = false;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public loadingProvider: LoadingProviderService,
      public actionSheet: ActionSheetController,
      public imageService: ImageService,
      private sanitizer: DomSanitizer,
      public modalCtrl: ModalController,
  ) {
    this.callUpload = this.navParams.get('callUpload');
    this.callDelete = this.navParams.get('callDelete');
  }

  ngOnInit() {
    if (this.img) {
      this.image = this.img;
      this.admin = this.adminLevel === 1 || this.adminLevel === 2 || this.adminLevel === 3;
      console.log('image: ' + this.image);
      console.log('type: ' + this.type);
    }
  }

  async takePicture() {
    // const image = await Plugins.Camera.getPhoto({
    //   quality: 100,
    //   allowEditing: false,
    //   resultType: CameraResultType.DataUrl,
    //   source: CameraSource.Photos
    // });
    //
    // this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));

    const imageModal = await this.modalCtrl.create({
      component: ImageCropperPage,
      componentProps: {
        hangoutId: this.hangoutId,
        type: this.type
      }
    });
    await imageModal.present();
    const {data} = await imageModal.onDidDismiss();
    console.log(data);
    if (data.new === true) {
      this.image = data.data;
      this.imgId = data.imgId;
      this.new = true;
    }
  }

  async deletePhoto(event: any) {
    // Ask if the user wants to delete for real.
    const action = await this.actionSheet.create({
      header: 'Deleting Photo',
      buttons: [{
        text: 'Delete',
        handler: () => {
          this.deleteForReal();
        }
      }, {
        text: 'cancel',
        role: 'cancel',
        handler: () => {
          console.log('cancelled');
        }
      }]
    });
    await action.present();
  }

  deleteForReal() {
    // this.callDelete().then(() => {
    //     this.navCtrl.pop();
    // });
    this.imageService.deleteCover({hangoutId: this.hangoutId, imageId: this.imgId}, this.type).subscribe((res: any) => {
      console.log(res.message);
      this.image = null;
      this.new = true;
    });
  }

  uploadCurrentPhoto(image, thumb): void {
    this.callUpload(image, thumb).then(() => {
      this.navCtrl.pop();
    });
  }

  close() {
    this.modalCtrl.dismiss({
      new: this.new,
      img: this.image,
      imgId: this.imgId
    });
  }

  toggleNavBar() {
    this.showNavBar = !this.showNavBar;
  }

}
