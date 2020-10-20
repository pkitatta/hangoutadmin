import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FirestoreService} from '../../api/firestore.service';
import {LoadingProviderService} from '../../services/loading-provider.service';
import {ModalController} from '@ionic/angular';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-theme-edit',
  templateUrl: './theme-edit.page.html',
  styleUrls: ['./theme-edit.page.scss'],
})
export class ThemeEditPage implements OnInit {
  @Input() theme: any;
  @Input() did: any;
  @Input() themeStatus: boolean;
  submitted = false;
  pipe = new DatePipe('en-US');
  // formData: FormGroup;
  formData = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    entry: new FormControl('', [Validators.required, Validators.pattern('^((0(\\.\\d{1,2})?)|([1-9]\\d*(\\.\\d{1,2})?))$')]),
    start: new FormControl('', [Validators.required]),
    end: new FormControl('', [Validators.required]),
  });
  private start: any;

  // minTime = '06:00';
  constructor(
      public firestoreService: FirestoreService,
      private route: ActivatedRoute,
      private formBuilder: FormBuilder,
      public loadingProvider: LoadingProviderService,
      private modalController: ModalController,
  ) {
  }

  ngOnInit() {
    if (this.theme) {
      console.log('Theme on edit page day: ' + this.theme.day + ', ' + typeof this.theme.day);
      console.log('This is the theme start: ' + this.theme.start + ', ' + typeof this.theme.start);
      console.log('This is the theme end: ' + this.theme.end + ', ' + typeof this.theme.end);
      console.log('This is the theme description: ' + this.theme.description + ', ' + typeof this.theme.description);
      console.log('This is the theme description: ' + this.theme.entry + ', ' + typeof this.theme.entry);
      this.start = this.theme.start;

      // this.formData = this.formBuilder.group({
      //     theme: [this.theme.day, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      //     price: ['', [Validators.required, Validators.pattern('[.\\d]')]],
      //     start: ['', [Validators.required]],
      //     end: ['', [Validators.required]],
      //     // gps_cords: [''],
      // });
      if (this.theme.description != null) {
        // Add ISO format to avoid update error 2020-05-07T10:30:22.218+03:00
        this.formData.patchValue({
          description: this.theme.description,
          entry: this.theme.entry,
          start: '1983-05-07T' + this.theme.start + ':22.218+03:00',
          end: '1983-05-07T' + this.theme.end + ':22.218+03:00',
        });
      }

    }
  }

  // getTheme() {
  //   this.firestoreService.getHangoutTheme(Number(this.route.snapshot.paramMap.get('id'))).valueChanges().subscribe((res: any) => {
  //     console.log('Results: ' + res.hid);
  //     this.theme = res.theme;
  //     this.fbObj = res;
  //   }, error => (error));
  // }

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
        description: this.formData.controls.description.value,
        start: this.pipe.transform(new Date(this.formData.controls.start.value), 'HH:mm'),
        end: this.pipe.transform(new Date(this.formData.controls.end.value), 'HH:mm'),
        entry: this.formData.controls.entry.value
      };

      // send http request
      await this.firestoreService.setTheme(data, this.did, this.theme.day, this.themeStatus);
      await this.loadingProvider.hide();
      await this.modalController.dismiss({
        new: true
      });
    }
  }

  // Dismiss Login Modal
  dismissModal() {
    this.modalController.dismiss();
  }

}
