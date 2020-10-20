import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HangoutAddPage} from '../hangout-add/hangout-add.page';
import {HangoutDataService} from '../../services/hangout-data.service';
import {AuthService} from '../../api/auth.service';
import {AlertController, MenuController, ModalController, NavController} from '@ionic/angular';
import {HangoutService} from '../../api/hangout.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  hangouts: any = [];

  constructor(
      private menu: MenuController,
      private authService: AuthService,
      private hangoutService: HangoutService,
      public route: ActivatedRoute,
      public navCtrl: NavController,
      private modalController: ModalController,
      private router: Router,
      private service: HangoutDataService,
      public alertCtrl: AlertController,
  ) {
    this.menu.enable(true);
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getHangouts();
  }

  getHangouts() {
    console.log('getting hangouts');
    this.hangoutService.load().subscribe((res: any) => {
      this.hangouts = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < res.data.length; i++) {
        console.log(res.data[i]);
        this.hangouts.push(res.data[i]);
      }
      this.service.setHangouts(this.hangouts);
    });
  }

  // Go to details
  goToDetails(hangout, i) {
    // this.service.setData(hangout.id, hangout);
    // // this.router.navigateByUrl('/dashboard/hangout-detail/' + hangout.id, {skipLocationChange: true});
    // this.router.navigate(['/dashboard/hangout-detail', {id: hangout.id}], {skipLocationChange: true});
    // this.router.navigate(['/dashboard/hangout-detail', {id: hangout.id}], {skipLocationChange: true});
  }

  async addHangout() {
    const loginModal = await this.modalController.create({
      component: HangoutAddPage,
    });
    await loginModal.present();
    const {data} = await loginModal.onDidDismiss();
    console.log(data);
    if (data.new === true) {
      this.getHangouts();
    }
  }

}
