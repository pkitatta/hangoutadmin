import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AlertService} from '../../api/alert.service';
import {ModalController} from '@ionic/angular';
import {HangoutService} from '../../api/hangout.service';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.page.html',
  styleUrls: ['./admin-add.page.scss'],
})
export class AdminAddPage implements OnInit {
  @Input() hangoutId;
  email = new FormControl('', [Validators.email, Validators.required]);
  role = 4;
  public showRoles = false;
  public user: any;
  private new = false;

  constructor(
      private modalCtrl: ModalController,
      private service: HangoutService,
      private alertService: AlertService,
  ) {
  }

  ngOnInit() {
  }

  dismissModal() {
    this.modalCtrl.dismiss({
      new: this.new
    });
  }

  checkEmail() {
    this.service.checkEmail({email: this.email.value}).subscribe((res: any) => {
      console.log('res: ' + res.data.id);
      if (res.data) {
        this.user = res.data;
        this.showRoles = true;
      }
    });
  }

  radioHandler(event) {
    // get data throught event emitter
    this.role = event.target.value;
    console.log('chosen role: ' + this.role);
  }

  async send() {
    const data = {
      hangoutId: this.hangoutId,
      level: this.role,
      userId: this.user.id
    };
    console.log('data: ' + data.level);
    this.service.createAdmin(data).subscribe(async (res: any) => {
      console.log('res: ' + res.data);
      if (res.message === 'Successful') {
        this.email.reset();
        this.showRoles = false;
        this.new = true;
      } else {
        await this.alertService.presentToast(res.message);
      }
    });
  }

}
