import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoadingProviderService} from '../../services/loading-provider.service';
import {ModalController} from '@ionic/angular';
import {HangoutService} from '../../api/hangout.service';

@Component({
  selector: 'app-tickets-add',
  templateUrl: './tickets-add.page.html',
  styleUrls: ['./tickets-add.page.scss'],
})
export class TicketsAddPage implements OnInit {
  submitted = false;
  minDate = Date();
  plotStartTime: any;
  plotEndTime: any;
  @Input() hangoutId;
  formData: FormGroup;
  // formData = new FormGroup({
  //   hangoutId: new FormControl(),
  //   issuedQty: new FormControl('', [Validators.required, Validators.pattern('0-9')]),
  //   ticketId: new FormControl('', [Validators.required]),
  //   title: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
  //   start_date_time: new FormControl('', [Validators.required]),
  //   end_date_time: new FormControl('', [Validators.required]),
  //
  //   dates: this.formBuilder.group({
  //     start_date_time: ['', [Validators.required]],
  //     end_date_time: ['', [Validators.required]],
  //   }, {validator: this.dateConfirming}),
  // });
  public compList: any;
  constructor(
      private formBuilder: FormBuilder,
      private modalCtrl: ModalController,
      private hangoutService: HangoutService,
      private loadingProvider: LoadingProviderService
  ) {
    this.formData = this.formBuilder.group({
      hangoutId: [''],
      issuedQty: ['', [Validators.required]],
      ticketId: [''],
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      // start_date_time: ['', [Validators.required]],
      // end_date_time: ['', [Validators.required]],

      dates: this.formBuilder.group({
        start_date_time: ['', [Validators.required]],
        end_date_time: ['', [Validators.required]],
      }, {validator: this.dateConfirming}),
    });
  }

  ngOnInit() {
    if (this.hangoutId) {
      this.hangoutService.getCompTemps().subscribe((res: any) => {
        this.compList = res.data;
        console.log('comp list: ' + this.compList);
      });
    }
  }
  // Dismiss Login Modal
  dismissModal() {
    this.modalCtrl.dismiss({
      new: false
    });
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

      this.formData.get('hangoutId').setValue(this.hangoutId);

      this.hangoutService.createComp(this.formData).subscribe(async (res: any) => {
        if (res.data) {
          await this.modalCtrl.dismiss({
            new: true,
            data: res.data
          });
          await this.loadingProvider.hide();
        }
      });
    }
  }

  dateConfirming(c: AbstractControl): { invalid: boolean } {
    console.log('time check: S- ' + c.get('start_date_time').value + ', E- ' + c.get('end_date_time').value);
    if (c.get('start_date_time').value > c.get('end_date_time').value) {
      console.log('The time is invalid');
      return {invalid: true};
    }
  }

}
