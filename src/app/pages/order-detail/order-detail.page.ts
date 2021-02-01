import {Component, Input, OnInit} from '@angular/core';
import {FirestoreService} from '../../api/firestore.service';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {
  @Input() did;
  @Input() order;
  @Input() tab;
  @Input() section;
  private orderItems: any;

  constructor(
      public modalCtrl: ModalController,
      public firestoreService: FirestoreService,
  ) {
  }

  ngOnInit() {
    console.log('Order: ' + this.order.order);
    this.orderItems = this.order.order;
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  async sendToDelivered() {
    await this.firestoreService.sendToDelivered(this.did, this.order.odid);
    await this.modalCtrl.dismiss();
  }

    async sendToEnroute() {
        await this.firestoreService.sendToEnroute(this.did, this.order.odid);
        await this.modalCtrl.dismiss();
    }

  async cancelOrder() {
    await this.firestoreService.cancelOrder(this.did, this.order.odid);
    await this.modalCtrl.dismiss();
  }

  async removeOrder() {
    await this.firestoreService.removeOrder(this.did, this.order.odid);
    await this.modalCtrl.dismiss();
  }

  async settlement(settlement: string) {
    await this.firestoreService.settleOrder(this.did, this.order.odid, settlement);
    await this.modalCtrl.dismiss();
  }

}
