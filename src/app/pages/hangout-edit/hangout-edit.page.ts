import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FirestoreService} from '../../api/firestore.service';
import {ModalController, NavController} from '@ionic/angular';
import {AlertService} from '../../api/alert.service';
import {AuthService} from '../../api/auth.service';
import {LoadingProviderService} from '../../services/loading-provider.service';
import {HangoutService} from '../../api/hangout.service';

@Component({
    selector: 'app-hangout-edit',
    templateUrl: './hangout-edit.page.html',
    styleUrls: ['./hangout-edit.page.scss'],
})
export class HangoutEditPage implements OnInit {
    @Input() type: string;
    @Input() data: any;
    submitted = false;

    public query = '';
    public cityId = '';
    public filteredList = [];
    public curfilteredList = [];
    public elementRef;
    cities: any = [];

    formData: FormGroup;
    basePrice: FormGroup;
    messageBoard = new FormControl('', [Validators.minLength(2), Validators.maxLength(300)]);
    checkFlag = false;
    curcodes: any = [];
    public queryCur: string;
    itemName = 'Beer Price';
    entryName = 'Entry Price';
    catName: string;

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
        this.hangoutEdit();
    }

    ngOnInit() {
        console.log('data: ' + this.data);
        if (this.data != null && this.type === 'hangout') {
            this.formData.patchValue({
                name: this.data.name,
                street_address: this.data.street_address,
                town: this.data.town,
                currency_code: this.data.currency_code,
                city_id: this.data.city_id,
                city_name: this.data.city.name,
            });
            this.queryCur = this.data.currency_code;
            this.query = this.data.city.name;
            this.cityId = this.data.city.id;
            this.catName = this.data.category ? this.data.category : 'None';

            this.getCityArray();
            this.getCurrencyArray();
        } else if (this.data != null && this.type === 'message') {
            this.messageBoard.setValue(this.data.message_board ? this.data.message_board : '');
        } else if (this.data != null && this.type === 'drink&entry') {
            this.basePrice.patchValue({
                entry_price: this.data.entryBase != null ? this.data.entryBase.price : 0,
                item_price: this.data.drinkFoodBase != null ? this.data.drinkFoodBase.price : 0,
            });
            this.itemName = this.data.drinkFoodBase != null ? this.data.drinkFoodBase.name : 'Beer Price';
            this.entryName = this.data.entryBase != null ? this.data.entryBase.name : 'Entry Price';
        }
    }

    hangoutEdit() {
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

        this.basePrice = this.formBuilder.group({
            item_price: [0, [Validators.required]],
            entry_price: [0, [Validators.required]],
        });
    }

    // Get the list of cities
    getCityArray() {
        this.user.getCities().subscribe((data: any) => {
            // data from api
            this.cities = data.data[0].cities;
            // this.queryCur = data.data[0].cur_code;
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

    async submit() {
        await this.loadingProvider.show();
        this.formData.patchValue({
            category: this.catName
        });
        console.log(this.formData);
        this.submitted = true;

        if (this.formData.valid) {
            this.submitted = false;

            // send http request
            this.hangoutService.editHangout(this.formData, this.data.id).subscribe(async (response: any) => {
                const data = {
                    name: this.formData.controls.name.value,
                    street_address: this.formData.controls.street_address.value,
                    town: this.formData.controls.town.value,
                    currency_code: this.formData.controls.currency_code.value,
                    city_id: this.formData.controls.city_id.value,
                    city_name: this.formData.controls.city_name.value,
                    category: this.formData.controls.category.value,
                };
                if (this.formData.controls.name.dirty) {
                    const info = {
                        name: this.formData.controls.name.value,
                    };
                    this.firestoreService
                        .editHangout(info, this.data.did)
                        .then(
                            (res) => {
                                this.loadingProvider.hide();
                            },
                            error => {
                                console.error(error);
                                this.loadingProvider.hide();
                            }
                        );
                    await this.modalController.dismiss({
                        new: true,
                        data
                    });
                    await this.alertService.presentToast('Your Hangout has been updated successfully.');
                } else {
                    await this.modalController.dismiss({
                        new: true,
                        data
                    });
                    await this.alertService.presentToast('Your Hangout has been updated successfully.');
                    this.loadingProvider.hide();
                }
            }, (e) => {
                console.log(e);
                this.loadingProvider.hide();
                this.alertService.presentToast('Error: ' + e.error.message);
            });
        }
    }

    async submitMessage() {
        await this.loadingProvider.show();
        this.submitted = true;

        if (this.messageBoard.valid) {
            if (this.messageBoard.value !== '') {
                this.submitted = false;
                const data = {
                    message_board: this.messageBoard.value,
                };
                // send http request
                await this.hangoutService.editHangoutMessage(data, this.data.id).subscribe(async (response: any) => {
                    await this.modalController.dismiss({
                        new: true,
                        data
                    });
                    await this.alertService.presentToast('Your Hangout has been updated successfully.');
                    this.loadingProvider.hide();
                }, (e) => {
                    console.log(e);
                    this.loadingProvider.hide();
                    this.alertService.presentToast('Error: ' + e.error.message);
                });
            } else {
                this.loadingProvider.hide();
                await this.alertService.presentToast('Can\'t send empty message');
            }
        }
    }

    async submitBase() {
        await this.loadingProvider.show();
        this.submitted = true;

        if (this.basePrice.valid) {
            this.submitted = false;

            if (
                this.basePrice.controls.item_price.dirty ||
                this.basePrice.controls.entry_price.dirty
            ) {
                const info = {
                    drinkFoodBase: {name: this.itemName, price: this.basePrice.controls.item_price.value},
                    entryBase: {name: this.entryName, price: this.basePrice.controls.entry_price.value},
                };

                // update firebase
                this.firestoreService
                    .editHangout(info, this.data.did)
                    .then(
                        (res) => {

                            if (this.itemName === 'Beer Price' || this.entryName === 'Entry Price') {
                                const data = {
                                    beer_price: this.itemName === 'Beer Price' ? this.basePrice.controls.item_price.value : null,
                                    entry_price: this.entryName === 'Entry Price' ? this.basePrice.controls.entry_price.value : null,
                                };

                                // send http request
                                this.hangoutService.editHangoutMessage(data, this.data.hid).subscribe(async (response: any) => {
                                    this.loadingProvider.hide();
                                    await this.alertService.presentToast('Your Hangout has been updated successfully.');
                                    await this.modalController.dismiss({
                                        new: true,
                                        data: null
                                    });
                                }, (e) => {
                                    console.log(e);
                                    this.loadingProvider.hide();
                                    this.alertService.presentToast('Error: ' + e.error.message);
                                });
                            } else {
                                this.loadingProvider.hide();
                                this.alertService.presentToast('Your Hangout has been updated successfully.');
                                this.modalController.dismiss({
                                    new: true,
                                    data: null
                                });
                            }

                        },
                        error => {
                            console.error(error);
                            this.loadingProvider.hide();
                        }
                    );
            } else {
                this.loadingProvider.hide();
            }
        }
    }

    dismissModal() {
        this.modalController.dismiss({
            new: false
        });
    }

}
