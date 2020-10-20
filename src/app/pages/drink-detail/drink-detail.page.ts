import {Component, Input, OnInit} from '@angular/core';
import {FirestoreService} from '../../api/firestore.service';
import {LoadingProviderService} from '../../services/loading-provider.service';
import {ModalController} from '@ionic/angular';
import {DocumentData} from '@angular/fire/firestore';

@Component({
  selector: 'app-drink-detail',
  templateUrl: './drink-detail.page.html',
  styleUrls: ['./drink-detail.page.scss'],
})
export class DrinkDetailPage implements OnInit {
  @Input() did;
  @Input() drink;
  public optList = [];
  private newOptArray: DocumentData[];
  constructor(
      public firestoreService: FirestoreService,
      public loadingProvider: LoadingProviderService,
      private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.getDrinkOptions();
  }

  // getDrinkOptions() {
  //   this.optList = this.firestoreService.getDrinkOptions(this.drink.name).valueChanges({ idField: 'odid' });
  //   console.log('menuLength: ' + this.optList);
  //   this.optList.forEach((menu) => {
  //     menu.forEach((menua) => {
  //           console.log('option1: ' + menua.odid);
  //           console.log('option2: ' + menua.option);
  //       });
  //   });
  // }

  getDrinkOptions() {
    this.firestoreService.getDrinkOptions(this.drink.name).subscribe((data) => {
      this.newOptArray = data;
      this.newOptArray.forEach((menua) => {
        // menua.option.isEmpty = false;
        const obj = {
          option: menua.option,
          isChecked: true,
          photoUrl: menua.photoUrl,
          avatarUrl: menua.avatarUrl,
          odid: menua.odid
        };
        this.optList.push(obj);
      });
      console.log('array1: ' + this.newOptArray);
    });
    console.log('array2: ' + this.optList);
  }

  async addDrink() {
    await this.loadingProvider.show();
    const drinkObj = {
      name: this.drink.name,
      photoUrl: this.drink.photoUrl,
      type: this.drink.type
    };
    console.log('drinkObj: ' + drinkObj);
    await this.firestoreService.addDrink(drinkObj, this.drink.mdid.toLowerCase(), this.did);
    await this.optList.forEach((drink) => {
      if (drink.isChecked) {
        const obj = {
          option: drink.option,
          photoUrl: drink.photoUrl,
          avatarUrl: drink.avatarUrl,
          available: true,
          price: 0
        };
        this.firestoreService.addDrinkOpt(obj, drink.odid, this.did, this.drink.mdid.toLowerCase());
      }
    });

    await this.loadingProvider.hide();
    await this.modalCtrl.dismiss();
  }

}
