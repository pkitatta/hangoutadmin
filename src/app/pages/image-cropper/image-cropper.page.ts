import { Component, Input, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {LoadingProviderService} from '../../services/loading-provider.service';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {ImageService} from '../../api/image.service';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {finalize, map} from 'rxjs/operators';
import {FirestoreService} from '../../api/firestore.service';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.page.html',
  styleUrls: ['./image-cropper.page.scss'],
})
export class ImageCropperPage implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<any>;
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
  @Input() did: any;
  @Input() menu: any;
  constructor(
      private imgService: ImageService,
      private modalController: ModalController,
      public navParams: NavParams,
      private loading: LoadingProviderService,
      private afStorage: AngularFireStorage,
      public firestoreService: FirestoreService,
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
    if (this.croppedImage !== '') {
      await this.loading.show();
      if (this.type === 'cover' || this.type === 'hangoutthumb') {
        const data = {
          hangoutId: this.hangoutId,
          photo: this.croppedImage,
          type: this.type
        };
        await this.imgService.uploadCoverPhoto(data, this.type).subscribe((res: any) => {
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
      } else {
        // create a random id
        const randomId = Math.random().toString(36).substring(2);

        // create a reference to the storage bucket location
        this.ref = await this.afStorage.ref('/hangoutimages/hangoutfoodbar/' + randomId);

        // the put method creates an AngularFireUploadTask
        // and kicks off the upload
        this.task = this.ref.putString(this.croppedImage, 'data_url');

        // AngularFireUploadTask provides observable
        // to get uploadProgress value
        // this.uploadProgress = this.task.snapshotChanges()
        // .pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));

        // // observe upload progress
        // this.uploadProgress = this.task.percentageChanges();
        // // get notified when the download URL is available
        this.task.snapshotChanges().pipe(
            finalize(async () => {
              this.downloadURL = await this.ref.getDownloadURL();
              this.downloadURL.subscribe(url => {
                this.imageURL = url;
                this.firestoreService.editMeal({photoUrl: this.imageURL}, this.did, this.menu.mdid);
                this.modalController.dismiss({
                  new: true,
                  data: this.imageURL // this is data: data
                });
                this.loading.hide();
              });
              // await this.firestoreService.editMeal({photoUrl: this.downloadURL}, this.did, this.menu.mdid);
            })
        )
            .subscribe();
      }
    }
  }
  dismissModal() {
    this.modalController.dismiss({
      new: false,
      data: null
    });
  }

}
