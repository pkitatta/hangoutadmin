import {Component, Input, OnInit} from '@angular/core';
import {MenuImageModalPage} from '../menu-image-modal/menu-image-modal.page';
import {ModalController} from '@ionic/angular';
import {MenuEditPage} from '../menu-edit/menu-edit.page';

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.page.html',
  styleUrls: ['./menu-detail.page.scss'],
})
export class MenuDetailPage implements OnInit {
  @Input() did: any;
  @Input() menu: any;
  public coverImage: any;

  constructor(
      private modalCtrl: ModalController,
  ) {
  }

  ngOnInit() {
    if (this.menu) {
      this.coverImage = this.menu.photoUrl ? this.menu.photoUrl : 'http://placehold.it/500x500?text=No+Image+Uploaded';
      // this.coverImage = this.menu.photoUrl ? this.menu.photoUrl : 'https://i.picsum.photos/id/200/500/500.jpg';
    }
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

}
