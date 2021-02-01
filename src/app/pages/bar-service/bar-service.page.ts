import { Component, OnInit } from '@angular/core';
import {AngularFirestoreCollection, DocumentData} from '@angular/fire/firestore';
import {ActivatedRoute, Router} from '@angular/router';
import {FirestoreService} from '../../api/firestore.service';
import {MenuAddPage} from '../menu-add/menu-add.page';
import {ModalController, NavController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {DrinkOptModalPage} from '../drink-opt-modal/drink-opt-modal.page';
import {OrderDetailPage} from '../order-detail/order-detail.page';

@Component({
  selector: 'app-bar-service',
  templateUrl: './bar-service.page.html',
  styleUrls: ['./bar-service.page.scss'],
})
export class BarServicePage implements OnInit {
  public hangoutId: any;
  public segment: string;
  public menuList;
  public hangIndex: any;
  public hangInfo: any;
  public did: string;
  public orderList = [];
  public orderNot = 0;
  public itemsCollection: AngularFirestoreCollection<any>;
  public deliveredList = [];
  public orderData: Observable<DocumentData[]>;
  public delNot: number;
  public fab: string;
  public receiptList = [];

  segmentChanged(ev: any) {
    console.log('Segment changed', ev.detail.value);
    if (ev.detail.value === 'menu') {
      this.fab = 'menu';
    } else {
      this.fab = '';
    }
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
    console.log('Bar service Init');
    this.segment = 'orders';
    this.hangIndex = this.route.snapshot.paramMap.get('id');
    if (this.route.snapshot.data.special) {
      this.hangInfo = this.route.snapshot.data.special;
      this.hangoutId = this.hangInfo.id;
      this.did = this.hangInfo.did;
      console.log('this.did: ', this.did);
    }
    this.getOrderData();
    // this.getHangoutOrders();
    this.getMenu();
    // this.getDeliveredOrders();
  }

  getMenu() {
    this.menuList = this.firestoreService.getHangoutMenu(this.did, 'bar').valueChanges({ idField: 'mdid' });
    console.log('menuLength: ' + this.menuList);
    this.menuList.forEach((menu) => {
      console.log('menu: ' + menu[0].name);
    });
  }

  getOrderData() {
    this.itemsCollection = this.firestoreService.getHangoutOrders(this.did, 'bar');
    this.orderData = this.itemsCollection.valueChanges({idField: 'odid'});
    console.log('list type: ' + typeof this.orderData);
    this.orderData.forEach((order) => {
      console.log('order: ' + order.length);
      // this.orderNot = order.length;
      this.orderList = [];
      this.deliveredList = [];
      this.receiptList = [];
      order.forEach((ord) => {
        console.log('ord: ' + ord.section);
        if (ord.delivered === false) {
          this.orderList.push(ord);
        } else if (ord.delivered === true && ord.settled === false) {
          this.deliveredList.push(ord);
        } else if (ord.delivered === true && ord.settled === true) {
          this.receiptList.push(ord);
        }
      });
      this.orderNot = this.orderList.length;
      this.delNot = this.deliveredList.length;
    });
  }

  // getHangoutOrders() {
  //     console.log('did: ' + this.did);
  //     this.orderList = this.firestoreService.getHangoutOrders(this.did, 'restaurant').valueChanges({ idField: 'odid' });
  //     console.log('orderLength: ' + this.orderList);
  //     this.orderList.forEach((order) => {
  //         console.log('order: ' + order.length);
  //         this.orderNot = order.length;
  //     });
  // }

  // getDeliveredOrders() {
  //     console.log('did: ' + this.did);
  //     this.deliveredList = this.firestoreService.getHangoutDeliveries(this.did, 'restaurant').valueChanges({ idField: 'odid' });
  //     console.log('orderLength: ' + this.deliveredList);
  //     this.deliveredList.forEach((order) => {
  //         console.log('order: ' + order.length);
  //         this.orderNot = order.length;
  //     });
  // }

  goBack() {
    this.router.navigate(['/dashboard/hangout-detail/' + this.hangIndex]);
  }

  async addDrink() {
    const menuModal = await this.modalCtrl.create({
      component: MenuAddPage,
      componentProps: {
        did: this.did,
      }
    });
    await menuModal.present();
  }

  async drinkDetail(menu: any) {
    console.log('menuId: ' + menu.mdid);
    const menuDetailModal = await this.modalCtrl.create({
      component: DrinkOptModalPage,
      componentProps: {
        menu,
        did: this.did,
      }
    });
    await menuDetailModal.present();
  }

  goToList() {
    this.navCtrl.navigateForward(
        [
          '/dashboard/hangout-detail/' + this.hangIndex + '/bar-service/'  + this.hangIndex + '/drink-add/' + this.hangIndex
        ]
    );
  }

  async orderDetail(order: any, tab: string) {
    const orderModal = await this.modalCtrl.create({
      component: OrderDetailPage,
      componentProps: {
        order,
        did: this.did,
        tab,
        section: 'bar'
      }
    });
    await orderModal.present();
  }

}
