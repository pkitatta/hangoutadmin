import {Component, Input, OnInit} from '@angular/core';
import {FirestoreService} from '../../api/firestore.service';
import {AlertService} from '../../api/alert.service';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-hangout-service-creation',
  templateUrl: './hangout-service-creation.page.html',
  styleUrls: ['./hangout-service-creation.page.scss'],
})
export class HangoutServiceCreationPage implements OnInit {
  @Input() did: string;
  @Input() servicesList: string[];
  constructor(
      private modalController: ModalController,
      public firestoreService: FirestoreService,
      private alertService: AlertService,
  ) { }

  ngOnInit() {
  }

  // Dismiss Login Modal
  dismissModal() {
    this.modalController.dismiss();
  }

  addService(service) {
    // this.firestoreService.addService(service, this.did).then(r => {
    //   this.servicesList.push(service);
    // });

    if (this.servicesList.findIndex((element) => element === service) === -1) {
      this.firestoreService.addService(service, this.did).then(r => {
        this.servicesList.push(service);
      });
    } else {
      this.alertService.presentToast('Service already added');
    }
  }

  removeService(service: string) {
    this.firestoreService.removeService(service, this.did).then(r => {
      this.servicesList.splice(this.servicesList.findIndex((element) => element === service), 1);
    });

    //   if (this.servicesList.findIndex((element) => element === service) > -1) {
    //     this.firestoreService.removeService(service, this.did).then(r => {
    //       this.servicesList.splice(this.servicesList.findIndex((element) => element === service), 1);
    //     });
    //   } else {
    //     this.alertService.presentToast('Service was removed');
    //   }
  }

}
