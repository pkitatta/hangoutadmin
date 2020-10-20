import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FirestoreService} from '../../api/firestore.service';
import {ModalController} from '@ionic/angular';
import {ThemeEditPage} from '../theme-edit/theme-edit.page';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.page.html',
  styleUrls: ['./theme.page.scss'],
})
export class ThemePage implements OnInit {
  @Input() did: string;
  @Input() themeStatus: boolean;
  public themeList;

  constructor(
      private route: ActivatedRoute,
      public modalCtrl: ModalController,
      public firestoreService: FirestoreService,
  ) {
  }

  ngOnInit() {
    this.getTheme();
  }

  getTheme() {
    this.themeList = this.firestoreService.getHangoutTheme(this.did).valueChanges();
    console.log('themeLength: ' + this.themeList.id);
    this.themeList.forEach((theme) => {
      console.log('theme: ' + theme[1].id);
    });
  }

  async themeEditPage(theme) {
    console.log('Theme going: ' + theme.day);
    const themeModal = await this.modalCtrl.create({
      component: ThemeEditPage,
      componentProps: {
        theme,
        did: this.did,
        themeStatus: this.themeStatus
      }
    });
    await themeModal.present();
    const {data} = await themeModal.onDidDismiss();
    console.log(data);
    // if (data.new === true) {
    //   this.coverImage = data.img;
    // }
  }

  // Dismiss Login Modal
  dismissModal() {
    this.modalCtrl.dismiss();
  }

}
