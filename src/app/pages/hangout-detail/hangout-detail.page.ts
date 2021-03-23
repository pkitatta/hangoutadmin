import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AlertController, ModalController, NavController, PopoverController} from '@ionic/angular';
import {ThemePage} from '../theme/theme.page';
import {HangoutEditPage} from '../hangout-edit/hangout-edit.page';
import {FirestoreService} from '../../api/firestore.service';
import {HangoutDataService} from '../../services/hangout-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HangoutImageModalPage} from '../hangout-image-modal/hangout-image-modal.page';
import {AuthService} from '../../api/auth.service';
import {HangoutService} from '../../api/hangout.service';
import {HangoutServiceCreationPage} from '../hangout-service-creation/hangout-service-creation.page';

@Component({
  selector: 'app-hangout-detail',
  templateUrl: './hangout-detail.page.html',
  styleUrls: ['./hangout-detail.page.scss'],
})
export class HangoutDetailPage implements OnInit {
  public hangInfo: any;
  private coverImageId: any;
  public coverImage: string;
  public thumbImage: string;
  public fbObj: any;
  public theme;
  public services: any;
  public servicesList = [];
  private hangoutId: any;
  public hangIndex: any;
  public adminLevel: any;
  private thumbImageId: any;

  constructor(
      public navCtrl: NavController,
      public popoverCtrl: PopoverController,
      public hangoutData: HangoutService,
      public modalCtrl: ModalController,
      public user: AuthService,
      public ref: ChangeDetectorRef,
      public alertCtrl: AlertController,
      private route: ActivatedRoute,
      private router: Router,
      private service: HangoutDataService,
      public firestoreService: FirestoreService,
  ) {
    // this.coverImage = 'https://i.picsum.photos/id/195/500/500.jpg';
    // this.thumbImage = 'https://i.picsum.photos/id/195/100/100.jpg';
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.hangIndex = this.route.snapshot.paramMap.get('id');
    this.getData();
  }

  async getData() {
    if (this.route.snapshot.data.special) {
      this.hangInfo = this.route.snapshot.data.special;
      this.hangoutId = this.hangInfo.id;
      this.coverImageId = this.hangInfo.photo_id;
      this.thumbImageId = this.hangInfo.thumbnail_id;
      this.coverImage = this.hangInfo.photo
          ? this.hangInfo.photo.file
          : null;
      this.thumbImage = this.hangInfo.thumbnail
          ? this.hangInfo.thumbnail.thumb
          : null;
      // this.coverImage = 'https://i.picsum.photos/id/195/500/500.jpg';
      // this.thumbImage = 'https://i.picsum.photos/id/195/200/200.jpg';
      this.adminLevel = this.hangInfo.pivot.level;
    }
    this.firestoreService.getHangout(Number(this.hangoutId)).valueChanges().subscribe((res: any) => {
      // console.log('Results: ' + res[0].services);
      // console.log('SevicesLength: ' + res[0].services.length);
      this.fbObj = res[0];
      this.theme = this.fbObj.theme;
      this.services = this.fbObj.services.length > 0;
      this.servicesList = this.fbObj.services;
      this.service.setDid(this.fbObj.did, this.hangIndex);
    }, error => (error));
  }

  getTheme() {
    // this.firestoreService
    //     .createCreate(did)
    //     .then(
    //         (res) => {
    //           console.log('saved on firebase: ' + res);
    //           this.loadingProvider.hide();
    //         },
    //         error => {
    //           console.error(error);
    //           this.loadingProvider.hide();
    //         }
    //     );
  }

  async enlargeImage(img, type) {
    const imageModal =  await this.modalCtrl.create({
      component: HangoutImageModalPage,
      componentProps: {
        img,
        type,
        imgId: type === 'cover' ? this.coverImageId : this.thumbImageId,
        hangoutId: this.hangoutId,
        adminLevel: this.adminLevel,
      },
      backdropDismiss: false
    });
    await imageModal.present();
    const { data } = await imageModal.onDidDismiss();
    console.log(data);
    if (data.new === true) {
      if (type === 'cover') {
        this.coverImage = data.img;
        this.coverImageId = data.imgId;
      } else {
        this.thumbImage = data.img;
        this.thumbImageId = data.imgId;
      }
    }
  }
  goBack() {
    this.router.navigate(['/dashboard']);
  }

  async themePage() {
    const themeModal = await this.modalCtrl.create({
      component: ThemePage,
      componentProps: {
        did: this.fbObj.did,
        themeStatus: this.fbObj.theme
      }
    });
    await themeModal.present();
    const {data} = await themeModal.onDidDismiss();
    // if (data.new === true) {
    //   this.coverImage = data.img;
    // }
  }

  async serviceCreationPage() {
    const themeModal = await this.modalCtrl.create({
      component: HangoutServiceCreationPage,
      componentProps: {
        did: this.fbObj.did,
        servicesList: this.servicesList
      }
    });
    await themeModal.present();
    const {data} = await themeModal.onDidDismiss();
    // if (data.new === true) {
    //   this.coverImage = data.img;
    // }
  }

  servicePage(service: any) {
    if (service === 'restaurant') {
      // this.router.navigate(['/hangout-detail/' + this.hangoutId + '/restaurant-service'], { relativeTo: this.route });
      this.navCtrl.navigateForward(['/dashboard/hangout-detail/' + this.hangIndex + '/restaurant-service/'  + this.hangIndex]);
    } else if (service === 'bar') {
      this.navCtrl.navigateForward(['/dashboard/hangout-detail/' + this.hangIndex + '/bar-service/'  + this.hangIndex]);
    } else if (service === 'hotel') {
      this.navCtrl.navigateForward('/hotel-service');
    } else if (service === 'takeaway') {
      this.navCtrl.navigateForward(['/dashboard/hangout-detail/' + this.hangIndex + '/takeaway-service/'  + this.hangIndex]);
    }
  }

  async goToEdit(type) {
    const editModal = await this.modalCtrl.create({
      component: HangoutEditPage,
      componentProps: {
        type,
        data: type === 'hangout' || type === 'message' ? this.hangInfo : this.fbObj
      }
    });
    await editModal.present();
    const {data} = await editModal.onDidDismiss();
    if (data && data.new === true) {
      if (type === 'hangout') {
        this.hangInfo.name = data.data.name;
        this.hangInfo.street_address = data.data.street_address;
        this.hangInfo.town = data.data.town;
        this.hangInfo.currency_code = data.data.currency_code;
        this.hangInfo.city_id = data.data.city_id;
        this.hangInfo.city_name = data.data.city_name;
        this.hangInfo.category = data.data.category;
      } else if (type === 'message') {
        this.hangInfo.message_board = data.data.message_board;
      }
    }
  }

  mediaPage(type: string) {
    this.router.navigate(['/dashboard/hangout-detail/' + this.hangIndex + '/media/' + this.hangIndex, { type }]);
  }

}
