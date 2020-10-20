import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HangoutDataService} from '../../services/hangout-data.service';
import {LoadingProviderService} from '../../services/loading-provider.service';
import {AdminAddPage} from '../admin-add/admin-add.page';
import {AlertController, ModalController} from '@ionic/angular';
import {HangoutService} from '../../api/hangout.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  public hangIndex: any;
  public hangInfo: any;
  public adminLevel: any;
  public hangoutId: any;
  public managers: any;

  constructor(
      private route: ActivatedRoute,
      public hangoutData: HangoutService,
      private service: HangoutDataService,
      private router: Router,
      private modalCtrl: ModalController,
      public alertController: AlertController,
      private loadingProvider: LoadingProviderService,
  ) {
    this.hangIndex = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log('hangoutId', this.route.snapshot.paramMap.get('id'));
    this.hangIndex = this.route.snapshot.paramMap.get('id');
    this.getData();
  }

  async getData() {
    if (this.route.snapshot.data.special) {
      this.hangInfo = this.route.snapshot.data.special;
      this.hangoutId = this.hangInfo.id;
      this.adminLevel = this.hangInfo.pivot.level;
      console.log('hangout info: ' + this.hangInfo.pivot.level);
    }
    this.getAdmins();
  }

  getAdmins() {
    this.hangoutData.getAdmins(this.hangoutId).subscribe((res: any) => {
      this.managers = res.managers;
      console.log('managerLength: ' + typeof this.managers[0].level);
      this.managers.forEach((manager) => {
        console.log('manager: ' + manager.id);
      });
    });
  }

  goBack() {
    this.router.navigate(['/dashboard/hangout-detail/' + this.hangIndex]);
  }

  async addAdmin() {
    const adminModal = await this.modalCtrl.create({
      component: AdminAddPage,
      componentProps: {
        hangoutId: this.hangoutId
      },
      backdropDismiss: false
    });
    await adminModal.present();
    const {data} = await adminModal.onDidDismiss();
    console.log(data);
    if (data.new === true) {
      this.getAdmins();
    }
  }

  async editAdmin(manager: any, key) {
    const alert = await this.alertController.create({
      header: 'Update Role',
      inputs: [
        {
          name: 'General Manager',
          type: 'radio',
          label: 'General Manager',
          value: 2,
          checked: manager.level === 2
        },
        {
          name: 'Content Manage',
          type: 'radio',
          label: 'Content Manage',
          value: 3,
          checked: manager.level === 3
        },
        {
          name: 'Service Manager',
          type: 'radio',
          label: 'Service Manager',
          value: 4,
          checked: manager.level === 4
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
          handler: (data) => {
            this.loadingProvider.show();
            console.log('Confirm Ok: ', typeof data);
            this.hangoutData.editAdmin({level: data}, manager.id).subscribe((res: any) => {
              if (res.message === 'Successful') {
                // const index = this.managers.findIndex(element => element === manager);
                // this.managers[index].level = data;
                this.getAdmins();
                this.loadingProvider.hide();
              }
              // if (res.data) {
              //     this.managers = res.data;
              // }
            }, error => {
              this.loadingProvider.hide();
              console.log(error);
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async removeAdmin(manager: any) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure you want to <strong>remove</strong> this manager?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.loadingProvider.show();
            this.hangoutData.deleteAdmin(manager.id).subscribe((res: any) => {
              if (res.message === 'Successful') {
                // this.managers.splice(this.managers.findIndex(element => element === manager), 1);
                this.getAdmins();
                this.loadingProvider.hide();
              }
            }, error => {
              this.loadingProvider.hide();
              console.log(error);
            });
          }
        }
      ]
    });

    await alert.present();
  }

}
