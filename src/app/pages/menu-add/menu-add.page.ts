import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FirestoreService} from '../../api/firestore.service';
import {LoadingProviderService} from '../../services/loading-provider.service';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-menu-add',
  templateUrl: './menu-add.page.html',
  styleUrls: ['./menu-add.page.scss'],
})
export class MenuAddPage implements OnInit {
  formData = new FormGroup({
    cat: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(2000)]),
    price: new FormControl('', [Validators.required, Validators.pattern('^((0(\\.\\d{1,2})?)|([1-9]\\d*(\\.\\d{1,2})?))$')]),
  });
  submitted = false;
  @Input() did: any;
  category = '';

  constructor(
      public loadingProvider: LoadingProviderService,
      private modalCtrl: ModalController,
      public firestoreService: FirestoreService,
  ) {
  }

  ngOnInit() {
  }

  async submit() {
    await this.loadingProvider.show();
    console.log(this.formData);
    // console.log('Date: ' + this.formData.controls.start.value);
    // const today = new Date(this.formData.controls.start.value);
    // const dd = this.pipe.transform(today, 'HH:mm');
    // console.log('DatePipe: ' + dd);
    this.submitted = true;

    if (this.formData.valid) {
      this.submitted = false;

      const data = {
        cat: this.formData.controls.cat.value.trim(),
        name: this.formData.controls.name.value,
        description: this.formData.controls.description.value,
        price: this.formData.controls.price.value,
        discountPrice: null,
        photoUrl: null,
        available: true
      };

      // send http request
      await this.firestoreService.addMeal(data, this.did);
      await this.formData.reset();
      await this.loadingProvider.hide();
      // await this.modalCtrl.dismiss({
      //   new: true
      // });
    }
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

}
