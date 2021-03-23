import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirestoreService} from '../../api/firestore.service';
import {AlertService} from '../../api/alert.service';
import {AuthService} from '../../api/auth.service';
import {LoadingProviderService} from '../../services/loading-provider.service';
import {ModalController, NavController} from '@ionic/angular';
import {HangoutService} from '../../api/hangout.service';

@Component({
  selector: 'app-hangout-add',
  templateUrl: './hangout-add.page.html',
  styleUrls: ['./hangout-add.page.scss'],
})
export class HangoutAddPage implements OnInit {
  submitted = false;

  public query = '';
  public cityId = '';
  public filteredList = [];
  public curfilteredList = [];
  public elementRef;
  cities: any = [];

  formData: FormGroup;
  checkFlag = false;
  curcodes: any = [];
  public queryCur: string;
  catName = 'None';

  constructor(
      private formBuilder: FormBuilder,
      public navCtrl: NavController,
      // public navParams: NavParams,
      // public alertCtrl: AlertController,
      private alertService: AlertService,
      public hangoutService: HangoutService,
      public myElement: ElementRef,
      private modalController: ModalController,
      public loadingProvider: LoadingProviderService,
      public user: AuthService,
      public firestoreService: FirestoreService,
  ) {
    this.getCityArray();

    this.elementRef = myElement;

    this.formData = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      street_address: ['', [Validators.required, Validators.pattern('[.,-_\\w\\s\\d]+')]],
      town: ['', [Validators.required, Validators.pattern('[.,-_\\w\\s\\d]+')]],
      currency_code: ['', [Validators.required, Validators.maxLength(3)]],
      city_id: ['', [Validators.required]],
      city_name: ['', [Validators.required]],
      category: [''],
      // gps_cords: [''],
    });
  }

  ngOnInit() {
    console.log('ionViewDidLoad PlotAddPage');
    this.getCityArray();
    this.getCurrencyArray();
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter HangoutAddPage');
    //
  }

  async submit() {
    await this.loadingProvider.show();
    this.formData.patchValue({
      category: this.catName
    });
    this.submitted = true;

    if (this.formData.valid) {
      this.submitted = false;

      // send http request
      this.hangoutService.addHangout(this.formData).subscribe((response: any) => {
        console.log('Saved on aws');
        this.firestoreService
            .createHangout(response.data.id, response.data.name)
            .then(
                async (res) => {
                  console.log('saved on fb');
                  await this.loadingProvider.hide();
                  await this.modalController.dismiss({
                    new: true
                  });
                  await this.alertService.presentToast('Your Hangout has been create successfully.');
                },
                error => {
                  console.error(error);
                  this.loadingProvider.hide();
                }
            );
      }, (e) => {
        console.log(e);
        this.loadingProvider.hide();
        this.alertService.presentToast('Error: ' + e.error.message);
      });
    }
  }

  // Get the list of cities
  getCityArray() {
    this.user.getCities().subscribe((data: any) => {
      // data from api
      this.cities = data.data[0].cities;
      this.queryCur = data.data[0].cur_code;
    });
  }

  getCurrencyArray() {
    this.user.getCurrencies().subscribe((data: any) => {
      // data from api
      this.curcodes = data.data;
    });
  }
  filterCur() {
    if (this.queryCur !== '') {
      this.curfilteredList = this.curcodes.filter((el) => {
        return el.cur_code.toLowerCase().indexOf(this.queryCur.toLowerCase()) > -1;
      });
    } else {
      this.curfilteredList = [];
    }
  }

  selectCur(cur) {
    this.queryCur = cur.cur_code.toUpperCase().trim();
    this.curfilteredList = [];
  }

  filter() {
    console.log(this.cities);
    if (this.query !== '') {
      this.filteredList = this.cities.filter((el) => {
        return el.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
      });
    } else {
      this.filteredList = [];
    }
  }

  select(city) {
    this.query = city.name;
    this.cityId = city.id;
    this.filteredList = [];
  }

  // handleClick(event) {
  //   let clickedComponent = event.target;
  //   let inside = false;
  //   do {
  //     if (clickedComponent === this.elementRef.nativeElement) {
  //       inside = true;
  //     }
  //     clickedComponent = clickedComponent.parentNode;
  //   } while (clickedComponent);
  //   if (!inside) {
  //     this.filteredList = [];
  //   }
  // }

  // If the user enters text in the form question and then navigates
  // without submitting first, ask if they meant to leave the page
  // ionViewCanLeave(): boolean | Promise<boolean> {
  //   // If the support message is empty we should just navigate
  //   if (
  //       !this.formData.controls.name.dirty &&
  //       !this.formData.controls.city_name.dirty &&
  //       // !this.formData.controls.email.dirty &&
  //       !this.formData.controls.street_address.dirty &&
  //       !this.formData.controls.town.dirty &&
  //       !this.formData.controls.passwords.dirty
  //   ) {
  //     return true;
  //   }
  //
  //   return new Promise((resolve: any, reject: any) => {
  //     let alert = this.alertCtrl.create({
  //       title: 'Leave this page?',
  //       message: 'Are you sure you want to leave this page? Your Hangout will not be created.'
  //     });
  //     alert.addButton({text: 'Stay', handler: reject});
  //     alert.addButton({text: 'Leave', role: 'cancel', handler: resolve});
  //
  //     alert.present();
  //   });
  // }

}
