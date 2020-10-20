import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TicketsEditPage} from '../tickets-edit/tickets-edit.page';
import {TicketsAddPage} from '../tickets-add/tickets-add.page';
import {ModalController} from '@ionic/angular';
import {HangoutService} from '../../api/hangout.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {
  public did: any;
  public hangoutId: any;
  public hangInfo: any;
  public hangIndex: any;
  public segment: string;
  public compCollection: any;

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private hangoutService: HangoutService,
      private modalCtrl: ModalController
  ) {
  }

  ngOnInit() {
    this.segment = 'comps';
    this.hangIndex = this.route.snapshot.paramMap.get('id');
    if (this.route.snapshot.data.special) {
      this.hangInfo = this.route.snapshot.data.special;
      this.hangoutId = this.hangInfo.id;
      this.did = this.hangInfo.did;
    }
    this.getCompTickets();
  }

  getCompTickets() {
    this.hangoutService.getHangoutComp(this.hangoutId).subscribe((res: any) => {
      this.compCollection = res.data;
      console.log('list type: ' + this.compCollection);
    });
    //
  }

  async addComp() {
    const addModal = await this.modalCtrl.create({
      component: TicketsAddPage,
      componentProps: {
        hangoutId: this.hangoutId,
      }
    });
    await addModal.present();
    const {data} = await addModal.onDidDismiss();
    if (data.new === true) {
      this.compCollection.push(data.data);
    }
  }

  compDetail(compData: any) {
    //
  }

  async compEdit(compData: any, index) {
    const editModal = await this.modalCtrl.create({
      component: TicketsEditPage,
      componentProps: {
        hangoutId: this.hangoutId,
        compData
      }
    });
    await editModal.present();
    const {data} = await editModal.onDidDismiss();
    if (data && data.new === true) {
      this.compCollection[index] = data.data;
    }
  }

  goBack() {
    this.router.navigate(['/dashboard/hangout-detail/' + this.hangIndex]);
  }

  compCancel(comp: any, i: number) {
    this.hangoutService.cancelComp(comp.id).subscribe((res: any) => {
      console.log('Response: ' + res.message);
      if (res.message === 'Successful') {
        this.compCollection[i].deleted_at = 1;
      }
    });
  }

  compRestore(comp: any, i: number) {
    this.hangoutService.restoreComp(comp.id).subscribe((res: any) => {
      console.log('Response: ' + res.message);
      if (res.message === 'Successful') {
        this.compCollection[i].deleted_at = null;
      }
    });
  }

}
