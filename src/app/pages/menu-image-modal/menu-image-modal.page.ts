import {Component, Input, OnInit} from '@angular/core';
import {ImageCropperPage} from '../image-cropper/image-cropper.page';
import {ActionSheetController, ModalController} from '@ionic/angular';
import {FirestoreService} from "../../api/firestore.service";

@Component({
  selector: 'app-menu-image-modal',
  templateUrl: './menu-image-modal.page.html',
  styleUrls: ['./menu-image-modal.page.scss'],
})
export class MenuImageModalPage implements OnInit {
  @Input() did: any;
  @Input() menu: any;
  public new = false;
  showNavBar = true;
  public image;
  private admin;
  constructor(
      private modalCtrl: ModalController,
      public actionSheet: ActionSheetController,
      public firestoreService: FirestoreService,
      ) { }

  ngOnInit() {
    this.image = this.menu.photoUrl ? this.menu.photoUrl : 'http://placehold.it/500x500?text=No+Image+Uploaded';
  }

  async takePic() {

    const imageModal = await this.modalCtrl.create({
      component: ImageCropperPage,
      componentProps: {
        did: this.did,
        menu: this.menu,
        type: 'menuImage'
      }
    });
    await imageModal.present();
    const {data} = await imageModal.onDidDismiss();
    console.log(data);
    if (data.new === true) {
      this.image = data.data;
      this.new = true;
    }
  }

  close() {
    this.modalCtrl.dismiss({
      new: this.new,
      data: this.image,
    });
  }

  async deletePhoto(event: any) {
    // Ask if the user wants to delete for real.
    const action = await this.actionSheet.create({
      header: 'Deleting Photo',
      buttons: [{
        text: 'Delete',
        handler: () => {
          this.deleteForReal();
        }
      }, {
        text: 'cancel',
        role: 'cancel',
        handler: () => {
          console.log('cancelled');
        }
      }]
    });
    await action.present();
  }

  async deleteForReal() {
    await this.firestoreService.editMeal({photoUrl: null}, this.did, this.menu.mdid);
    this.image = 'http://placehold.it/500x500?text=No+Image+Uploaded';
    this.new = true;
  }

  toggleNavBar() {
    this.showNavBar = !this.showNavBar;
  }

}
