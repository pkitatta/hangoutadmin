import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../api/auth.service';
import {AlertService} from '../../api/alert.service';
import {LoadingProviderService} from '../../services/loading-provider.service';
import {ModalController, NavController} from '@ionic/angular';
import {NgForm} from '@angular/forms';
import {RegisterPage} from '../register/register.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
      private modalController: ModalController,
      private authService: AuthService,
      private navCtrl: NavController,
      private alertService: AlertService,
      private loadingProvider: LoadingProviderService
  ) { }

  ngOnInit() {
  }

  // Dismiss Login Modal
  dismissLogin() {
    this.modalController.dismiss();
  }

  // On Register button tap, dismiss login modal and open register modal
  async registerModal() {
    this.dismissLogin();
    const registerModal = await this.modalController.create({
      component: RegisterPage
    });
    return await registerModal.present();
  }

  login(form: NgForm) {
    this.loadingProvider.show();
    this.authService.login(form.value.email, form.value.password).subscribe(
        data => {
          this.alertService.presentToast('Logged In');
        },
        error => {
          console.log(error);
          this.loadingProvider.hide();
        },
        async () => {
          await this.loadingProvider.hide();
          await this.dismissLogin();
          await this.navCtrl.navigateRoot('/dashboard');
        }
    );
  }

}
