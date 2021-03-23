import { Component, OnInit } from '@angular/core';
import {ImagePreviewPage} from '../image-preview/image-preview.page';
import {ActivatedRoute, Router} from '@angular/router';
import {FirestoreService} from '../../api/firestore.service';
import {ModalController, NavController} from '@ionic/angular';
import {HangoutImageModalPage} from '../hangout-image-modal/hangout-image-modal.page';
import {HangoutService} from '../../api/hangout.service';
import {VideoPlayerPage} from '../video-player/video-player.page';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-media',
  templateUrl: './media.page.html',
  styleUrls: ['./media.page.scss'],
})
export class MediaPage implements OnInit {
  public type: string;
  public hangIndex: any;
  public segment: string;
  hangPhotoList: any;
  public adminLevel: any;
  public hangoutId: any;
  public hangInfo: any;
  public userId: any;
  pipe = new DatePipe('en-US');
  public hangTempList: any;
  public userPhotoList: any;
  public videoList: any;

  // Use your own locale

  segmentChanged(ev: any) {
    if (ev.detail.value === 'hangout') {
      this.getHangoutPhotos();
    } else if (ev.detail.value === 'user') {
      this.getUserPhotos();
    } else if (ev.detail.value === 'video') {
      this.getVideos();
    }
  }

  constructor(
      public navCtrl: NavController,
      private route: ActivatedRoute,
      private router: Router,
      public modalCtrl: ModalController,
      public firestoreService: FirestoreService,
      public hangoutData: HangoutService,
  ) {
  }

  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type');
    this.hangIndex = this.route.snapshot.paramMap.get('id');
    this.segment = this.type;
    this.getData();
  }

  ionViewDidEnter() {
    // Gets friends in hangout
    setInterval(() => {
      // this.getHangoutPhotos();
    }, 100000);
  }

  async getData() {
    if (this.route.snapshot.data.special) {
      this.hangInfo = this.route.snapshot.data.special;
      this.hangoutId = this.hangInfo.id;
      this.adminLevel = this.hangInfo.pivot.level;
      this.userId = this.hangInfo.pivot.user_id;
    }
    if (this.type === 'hangout') {
      this.getHangoutPhotos();
    } else if (this.type === 'user') {
      this.getUserPhotos();
    } else if (this.type === 'video') {
      this.getVideos();
    }
  }

  async getHangoutPhotos() {
    this.hangoutData.getAdminPhotos(this.hangoutId).subscribe((res: any) => {
      this.hangTempList = res.data;
      this.hangPhotoList = this.hangTempList;
      // this.hangPhotoList.forEach((photo) => {
      //     console.log('data: ' + photo.id);
      // });
    });

    // const hangList: any = await this.hangoutData.getAdminPhotos(this.hangoutId);
    //
    // console.log('list: ' + hangList.data[0]);
  }

  async getUserPhotos() {
    this.hangoutData.getAUserPhotos(this.hangoutId).subscribe((res: any) => {
      this.hangTempList = res.data;
      this.userPhotoList = this.hangTempList;
    });
  }

  async getVideos() {
    this.hangoutData.getVideos(this.hangoutId).subscribe((res: any) => {
      this.hangTempList = res.data;
      this.videoList = this.hangTempList;
    });
  }

  goBack() {
    this.router.navigate(['/dashboard/hangout-detail/' + this.hangIndex]);
  }

  async addPhoto() {
    const imageModal = await this.modalCtrl.create({
      component: ImagePreviewPage,
      componentProps: {
        hangoutId: this.hangoutId,
        userId: this.userId
      }
    });
    await imageModal.present();
    const {data} = await imageModal.onDidDismiss();
    if (data && data.new === true) {
      // this.hangTempList.push(data.data);
      // this.hangPhotoList = [];
      // this.hangPhotoList = this.hangTempList;
      this.getHangoutPhotos();
    }
  }

  async enlargeImage(img, type) {
    const imageModal =  await this.modalCtrl.create({
      component: HangoutImageModalPage,
      componentProps: {
        img: img.file,
        type,
        imgId: img.id,
        hangoutId: this.hangoutId,
        adminLevel: this.adminLevel,
      },
      backdropDismiss: false,
      cssClass: 'media-modal',
    });
    await imageModal.present();
    const { data } = await imageModal.onDidDismiss();
    if (data.new === true) {
      if (type === 'admin' && data.img === null) {
        this.getHangoutPhotos();
      }
    }
  }
  async enlargeVideo(vid, type) {
    const imageModal =  await this.modalCtrl.create({
      component: VideoPlayerPage,
      componentProps: {
        vid,
        vidId: vid.id,
        type,
        hangoutId: this.hangoutId,
        adminLevel: this.adminLevel,
      },
      backdropDismiss: false,
      cssClass: 'media-modal',
    });
    await imageModal.present();
    const { data } = await imageModal.onDidDismiss();
    if (data.new === true) {
      if (type === 'admin' && data.img === null) {
        this.getVideos();
      }
    }
  }

}
