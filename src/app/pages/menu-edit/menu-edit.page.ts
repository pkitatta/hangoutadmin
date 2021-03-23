import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FirestoreService} from '../../api/firestore.service';
import {LoadingProviderService} from '../../services/loading-provider.service';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.page.html',
  styleUrls: ['./menu-edit.page.scss'],
})
export class MenuEditPage implements OnInit {
  public available = { val: 'Pepperoni', isChecked: true };
  formData = new FormGroup({
    cat: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(2000)]),
    price: new FormControl('', [Validators.required, Validators.pattern('^((0(\\.\\d{1,2})?)|([1-9]\\d*(\\.\\d{1,2})?))$')]),
    discountPrice: new FormControl('', [Validators.pattern('^((0(\\.\\d{1,2})?)|([1-9]\\d*(\\.\\d{1,2})?))$')]),
    available: new FormControl(true, [Validators.required]),
  });
  submitted = false;
  @Input() did: any;
  @Input() menu: any;
  category = '';
  constructor(
      public loadingProvider: LoadingProviderService,
      private modalCtrl: ModalController,
      public firestoreService: FirestoreService,
  ) { }

  ngOnInit() {
    if (this.menu.name != null) {
      this.formData.patchValue({
        cat: this.menu.cat,
        name: this.menu.name,
        description: this.menu.description,
        price: this.menu.price,
        discountPrice: this.menu.discountPrice,
        available: this.menu.available,
      });
    }
  }

  async submit() {
    await this.loadingProvider.show();
    console.log(this.formData);
    this.submitted = true;

    if (this.formData.valid) {
      this.submitted = false;

      const data = {
        cat: this.formData.controls.cat.value.trim(),
        name: this.formData.controls.name.value,
        description: this.formData.controls.description.value,
        price: this.formData.controls.price.value,
        discountPrice: this.formData.controls.discountPrice.value,
        available: this.formData.controls.available.value
      };

      console.log('data: ' + data);

      // send http request
      await this.firestoreService.editMeal(data, this.did, this.menu.mdid);
      await this.loadingProvider.hide();
      await this.modalCtrl.dismiss({
        new: true
      });
    }
  }
  dismissModal() {
    this.modalCtrl.dismiss();
  }

}
