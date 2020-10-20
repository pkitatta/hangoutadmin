import { Component, OnInit } from '@angular/core';
import {AngularFirestoreCollection, DocumentData} from '@angular/fire/firestore';
import {ActivatedRoute, Router} from '@angular/router';
import {FirestoreService} from '../../api/firestore.service';
import {DrinkDetailPage} from '../drink-detail/drink-detail.page';
import {ModalController, NavController} from '@ionic/angular';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-drink-add',
  templateUrl: './drink-add.page.html',
  styleUrls: ['./drink-add.page.scss'],
})
export class DrinkAddPage implements OnInit {
  private hangoutId: any;
  public segment: string;
  public drinkList;
  public hangIndex: any;
  public hangInfo: any;
  public did: string;
  public orderList = [];
  public orderNot = 0;
  public itemsCollection: AngularFirestoreCollection<any>;
  public deliveredList = [];
  public orderData: Observable<DocumentData[]>;
  public delNot: number;

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  constructor(
      public navCtrl: NavController,
      private route: ActivatedRoute,
      private router: Router,

      public modalCtrl: ModalController,
      public firestoreService: FirestoreService,
  ) {
  }

  ngOnInit() {
    this.segment = 'orders';
    this.hangIndex = this.route.snapshot.paramMap.get('id');
    if (this.route.snapshot.data.special) {
      this.hangInfo = this.route.snapshot.data.special;
      this.hangoutId = this.hangInfo.id;
      this.did = this.hangInfo.did;
    }
    this.getDrinkList();
  }

  getDrinkList() {
    this.drinkList = this.firestoreService.getAllDrinks().valueChanges({ idField: 'mdid' });
  }

  goBack() {
    this.router.navigate(['/dashboard/hangout-detail/' + this.hangIndex + '/bar-service/'  + this.hangIndex]);
  }

  async drinkDetail(drink: any) {
    console.log('menuId: ' + drink.mdid);
    const drinkDetailModal = await this.modalCtrl.create({
      component: DrinkDetailPage,
      componentProps: {
        drink,
        did: this.did,
      }
    });
    await drinkDetailModal.present();
  }

}
