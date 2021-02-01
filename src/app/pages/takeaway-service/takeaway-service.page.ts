import { Component, OnInit } from '@angular/core';
import {AngularFirestoreCollection, DocumentData} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AlertController, ModalController, NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {FirestoreService} from '../../api/firestore.service';
import {MenuAddPage} from '../menu-add/menu-add.page';
import {MenuDetailPage} from '../menu-detail/menu-detail.page';
import {OrderDetailPage} from '../order-detail/order-detail.page';

@Component({
  selector: 'app-takeaway-service',
  templateUrl: './takeaway-service.page.html',
  styleUrls: ['./takeaway-service.page.scss'],
})
export class TakeawayServicePage implements OnInit {
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
  public enrNot: number;
  public fab: string;
  // public receiptList = [];
  public enrouteList = [];

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
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
      public alertController: AlertController,
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
    this.getOrderData();
    // this.getHangoutOrders();
    this.getMenu();
    // this.getDeliveredOrders();
  }

  getMenu() {
    this.menuList = this.firestoreService.getHangoutMenu(this.did, 'restaurant').valueChanges({ idField: 'mdid' });
    console.log('menuLength: ' + this.menuList);
    this.menuList.forEach((menu) => {
      console.log('menu: ' + menu[0].name);
    });
  }

  getOrderData() {
    this.itemsCollection = this.firestoreService.getHangoutDeliveries(this.did, 'takeaway');
    this.orderData = this.itemsCollection.valueChanges({idField: 'odid'});
    console.log('list type: ' + typeof this.orderData);
    this.orderData.forEach((order) => {
      console.log('orderLenght: ' + order.length);
      // this.orderNot = order.length;
      this.orderList = [];
      this.enrouteList = [];
      this.deliveredList = [];
      order.forEach((ord) => {
        console.log('ord: ' + ord.section);
        if (ord.enroute === false && ord.delivered === false) {
          this.orderList.push(ord);
        } else if (ord.enroute === true && ord.delivered === false) {
          this.enrouteList.push(ord);
        } else if (ord.delivered === true) {
          this.deliveredList.push(ord);
        }
      });
      this.orderNot = this.orderList.length;
      this.enrNot = this.enrouteList.length;
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

  async addMeal() {
    const menuModal = await this.modalCtrl.create({
      component: MenuAddPage,
      componentProps: {
        did: this.did,
      }
    });
    await menuModal.present();
  }

  async menuDetail(menu: any) {
    console.log('menuId: ' + menu.mdid);
    const menuDetailModal = await this.modalCtrl.create({
      component: MenuDetailPage,
      componentProps: {
        menu,
        did: this.did,
      }
    });
    await menuDetailModal.present();
  }

  async orderDetail(order, tab) {
    console.log('order: ' + order.order);
    const orderModal = await this.modalCtrl.create({
      component: OrderDetailPage,
      componentProps: {
        order,
        did: this.did,
        tab,
        section: 'takeaway'
      }
    });
    await orderModal.present();
  }

  async clearList() {
    if (this.orderList.length > 0) {
      const alert = await this.alertController.create({
        header: 'Alert',
        message: 'Item/items in the order list need settling.',
        buttons: ['OK']
      });

      await alert.present();
    } else if (this.enrouteList.length > 0) {
      const alert = await this.alertController.create({
        header: 'Alert',
        message: 'Item/items in the en route list need settling.',
        buttons: ['OK']
      });

      await alert.present();
    } else {
      //
    }
  }
}
