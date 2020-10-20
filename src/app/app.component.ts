import { Component, OnInit } from '@angular/core';

import {NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AlertService} from './api/alert.service';
import {AuthService} from './api/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Hangouts',
      url: '/dashboard',
      icon: 'paper-plane'
    },
    {
      title: 'Profile',
      url: '/folder/Inbox',
      icon: 'mail'
    },
    {
      title: 'Archived',
      url: '/folder/Archived',
      icon: 'archive'
    },
  ];

  constructor(
      private platform: Platform,
      private splashScreen: SplashScreen,
      private statusBar: StatusBar,
      private alertService: AlertService,
      private authService: AuthService,
      private navCtrl: NavController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  // When Logout Button is pressed
  logout() {
    this.authService.logout().subscribe(
        (data: any) => {
          this.alertService.presentToast(data.message);
        },
        error => {
          console.log(error);
        },
        () => {
          this.navCtrl.navigateRoot('/landing');
        }
    );
  }
}
