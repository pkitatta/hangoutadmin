import { Injectable } from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingProviderService {
  private loading;
  constructor(
      public loadingController: LoadingController
  ) {
    console.log('Initializing Loading Provider');
  }

  // Show loading
  async show() {
    if (!this.loading) {
      this.loading = await this.loadingController.create({spinner: 'crescent'});
      await this.loading.present();
    }
  }

  // Hide loading
  hide() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }
}
