import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../api/auth.service';
import {MenuController, ModalController, NavController} from '@ionic/angular';
import {RegisterPage} from '../register/register.page';
import {LoginPage} from '../login/login.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  token: any;
  isLoggedIn = false;
  constructor(
      private modalController: ModalController,
      private menu: MenuController,
      private authService: AuthService,
      private navCtrl: NavController,
      private storage: Storage,
  ) {
    this.menu.enable(false);
  }

  async ngOnInit() {
    await this.storage.get('token').then((value) => {
      if (value) {
        this.token = value;
        this.isLoggedIn = true;
        this.navCtrl.navigateRoot('/dashboard');
        console.log('token loaded', this.token);
      }
    });
  }

  // ionViewWillEnter() {
  //   this.authService.getToken().then(() => {
  //     if (this.authService.isLoggedIn) {
  //       this.navCtrl.navigateRoot('/dashboard');
  //     }
  //   });
  // }

  async register() {
    const registerModal = await this.modalController.create({
      component: RegisterPage
    });
    return await registerModal.present();
  }

  async login() {
    const loginModal = await this.modalController.create({
      component: LoginPage,
    });
    return await loginModal.present();
  }

}
