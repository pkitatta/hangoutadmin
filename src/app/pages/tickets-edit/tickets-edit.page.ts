import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoadingProviderService} from '../../services/loading-provider.service';
import {ModalController} from '@ionic/angular';
import {HangoutService} from '../../api/hangout.service';

@Component({
  selector: 'app-tickets-edit',
  templateUrl: './tickets-edit.page.html',
  styleUrls: ['./tickets-edit.page.scss'],
})
export class TicketsEditPage implements OnInit {
  submitted = false;
  minDate = Date();
  plotStartTime: any;
  plotEndTime: any;
  @Input() hangoutId;
  @Input() compData;
  formData: FormGroup;
  public compList: any;

  constructor(
      private formBuilder: FormBuilder,
      private modalCtrl: ModalController,
      private hangoutService: HangoutService,
      private loadingProvider: LoadingProviderService
  ) {
    this.formData = this.formBuilder.group({
      ticketId: [''],
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],

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

      this.plotStartTime = this.compData.start_date_time;
      this.plotEndTime = this.compData.end_date_time;

      this.formData.patchValue({
        ticketId: Number(this.compData.type),
        title: this.compData.title,
        dates: this.formBuilder.group({
          start_date_time: this.compData.start_date_time,
          end_date_time: this.compData.end_date_time,
        }, {validator: this.dateConfirming}),
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
    this.submitted = true;

    if (this.formData.valid) {
      this.submitted = false;

      this.hangoutService.editComp(this.formData, this.compData.id).subscribe(async (res: any) => {
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
