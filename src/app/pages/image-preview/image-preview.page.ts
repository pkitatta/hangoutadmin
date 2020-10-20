import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoadingProviderService} from '../../services/loading-provider.service';
import {ModalController} from '@ionic/angular';
import {HangoutService} from '../../api/hangout.service';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.page.html',
  styleUrls: ['./image-preview.page.scss'],
})
export class ImagePreviewPage implements OnInit {
  @Input() hangoutId;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  private new = false;
  public description;
  constructor(
      private http: HttpClient,
      private hangoutData: HangoutService,
      private loadingProvider: LoadingProviderService,
      private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    // console.log('formData: ' + new Date());
  }

  fileProgress(fileInput: any) {
    this.fileData = fileInput.target.files[0] as File;
    console.log('Image: ' + this.fileData.size);
    this.preview();
  }

  preview() {
    // Show preview
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (event) => {
      this.previewUrl = reader.result;
    };
  }

  onSubmit() {
    this.loadingProvider.show();
    const formData = new FormData();
    formData.append('imgFile', this.fileData);
    formData.append('hangoutId', this.hangoutId);
    formData.append('date', new Date().toString());
    formData.append('description', this.description);
    console.log('formData: ' + formData.get('description'));
    this.hangoutData.uploadPhoto(formData)
        .subscribe(async (events: any) => {
          console.log('res: ' + events.data[0].photo_time);
          this.loadingProvider.hide();
          // if (events.type === HttpEventType.UploadProgress) {
          //   this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
          //   console.log(this.fileUploadProgress);
          // } else if (events.type === HttpEventType.Response) {
          //   this.fileUploadProgress = '';
          //   console.log(events.body);
          //   alert('SUCCESS !!');
          // }
          this.new = true;
          await this.modalCtrl.dismiss({
            new: this.new,
            data: events.data[0]
          });

        }, error => {
          console.log(error);
          this.loadingProvider.hide();
        }) ;
  }

  close() {
    this.modalCtrl.dismiss({
      new: this.new,
    });
  }

}
