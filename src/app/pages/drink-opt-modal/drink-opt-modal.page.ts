import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {FirestoreService} from '../../api/firestore.service';
import {MenuImageModalPage} from '../menu-image-modal/menu-image-modal.page';
import {LoadingProviderService} from '../../services/loading-provider.service';
import {AlertController, ModalController} from '@ionic/angular';
import {MenuEditPage} from '../menu-edit/menu-edit.page';
import {DocumentData} from '@angular/fire/firestore';

@Component({
  selector: 'app-drink-opt-modal',
  templateUrl: './drink-opt-modal.page.html',
  styleUrls: ['./drink-opt-modal.page.scss'],
})
export class DrinkOptModalPage implements OnInit {
  @Input() did: any;
  @Input() menu: any;
  public coverImage: any;
  public optList = [];
  private additional = false;
  price = new FormControl(0, [Validators.required]);
  public otherList = [];
  public newOptArray: DocumentData[];
  private tempList: any[];

  constructor(
      private modalCtrl: ModalController,
      public firestoreService: FirestoreService,
      public alertController: AlertController,
      public loadingProvider: LoadingProviderService
  ) {
  }

  async ngOnInit() {
    if (this.menu) {
      this.coverImage = this.menu.photoUrl ? this.menu.photoUrl : 'http://placehold.it/500x500?text=No+Image+Uploaded';
      // this.coverImage = this.menu.photoUrl ? this.menu.photoUrl : 'https://i.picsum.photos/id/200/500/500.jpg';
    }
    await this.getDrinkOptions();
    await this.getOtherOptions();
  }

  getDrinkOptions() {
    this.firestoreService.getHangoutDrinkOptions(this.menu.mdid, this.did).subscribe((data) => {
      this.optList = data;
    });
  }
  getOtherOptions() {
    this.firestoreService.getDrinkOptions(this.menu.name).subscribe(async (data) => {
      this.newOptArray = data;
      this.tempList = [];
      this.otherList = [];
      await this.optList.map((item2) => {
        console.log('value: ' + item2.option);
        this.tempList.push(item2);
      });

      await this.newOptArray.map((item) => {
        console.log('value2: ' + this.tempList.findIndex((el) => el.option === item.option) + ', real' + item.option);
        if (this.tempList.findIndex((el) => el.option === item.option) === -1) {
          const obj = {
            option: item.option,
            photoUrl: item.photoUrl,
            avatarUrl: item.avatarUrl,
            odid: item.odid
          };
          this.otherList.push(obj);
        }
      });
      console.log('other length: ' + this.otherList.length);
      console.log('array1: ' + this.newOptArray);
    });
    console.log('array2: ' + this.optList);
  }

  async enlargeImage(img) {
    const imageModal = await this.modalCtrl.create({
      component: MenuImageModalPage,
      componentProps: {
        img,
        // mdid: this.route.snapshot.paramMap.get('id'),
        did: this.did,
      }
    });
    await imageModal.present();
    // const { data } = await imageModal.onDidDismiss();
    // console.log(data);
    // if (data.new === true) {
    //   this.coverImage = data.img;
    // }
  }

  async menuEditPage() {
    const imageModal = await this.modalCtrl.create({
      component: MenuEditPage,
      componentProps: {
        menu: this.menu,
        // mdid: this.route.snapshot.paramMap.get('id'),
        did: this.did,
      }
    });
    await imageModal.present();
    // const { data } = await imageModal.onDidDismiss();
    // console.log(data);
    // if (data.new === true) {
    //   this.coverImage = data.img;
    // }
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  changeAvail(option: any) {
    this.firestoreService.changeDrinkAvail(this.menu.mdid, this.did, option);
  }

  async editPricePrompt(opt: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Edit Price',
      inputs: [
        {
          name: 'price',
          type: 'text',
          placeholder: opt.price.toString()
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: async (data) => {
            console.log('Confirm Ok', data);
            await this.loadingProvider.show();
            await this.firestoreService.editDrinkPrice(this.menu.mdid, this.did, opt.odid, data.price);
            await this.loadingProvider.hide();
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteOpt(opt: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: async () => {
            console.log('Confirm Ok');
            await this.loadingProvider.show();
            await this.firestoreService.deleteDrinkOption(this.menu.mdid, this.did, opt.odid);
            await this.loadingProvider.hide();
            const obj = {
              option: opt.option,
              photoUrl: opt.photoUrl,
              avatarUrl: opt.avatarUrl,
              odid: opt.odid
            };
            this.otherList.push(obj);
          }
        }
      ]
    });

    await alert.present();
  }

  addOpt(opt: any) {
    const obj = {
      option: opt.option,
      photoUrl: opt.photoUrl,
      avatarUrl: opt.avatarUrl,
      available: true,
      price: 0
    };
    this.firestoreService.addDrinkOpt(obj, opt.odid, this.did, this.menu.mdid.toLowerCase());
    this.otherList.splice(this.otherList.findIndex((el) => el.option === opt.option), 1);
  }

}
