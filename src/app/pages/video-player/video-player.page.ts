import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {ActionSheetController, ModalController} from '@ionic/angular';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.page.html',
  styleUrls: ['./video-player.page.scss'],
})
export class VideoPlayerPage implements OnInit {

  @Input() hangoutId;
  @Input() type;
  @Input() vid;
  @Input() vidId;
  @Input() admin;
  @Input() hangName;
  @Input() userId;
  showNavBar = true;
  private comLen: any;
  private videoDesc: any;
  private videoLikes: any;
  private likLen: any;
  private youLike: any;
  private currentIndex: number;
  private currentObj: any;
  private likeBtn: any;
  private preLike: any;
  private videoComments: any;
  private initialVid: any;
  private mediaType = 'video';
  private playTime = true;
  private showButton = true;
  private curVid: any;
  private image: any;
  private adminLevel: number;
  private new = false;
  constructor(
      public element: ElementRef,
      public actionSheet: ActionSheetController,
      public modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    console.log('ionViewDidLoad VideoPlayerPage');

    console.log('This is the img data: ', this.vid);
    console.log('This is the admin data: ', this.admin);
    console.log('This is the hangoutId data: ', this.hangoutId);
    console.log('This is the userId data: ', this.userId);

    if (this.vid.vthumb) {
      this.image = this.vid.vthumb;
      this.admin = this.adminLevel === 1 || this.adminLevel === 2 || this.adminLevel === 3;
      console.log('image: ' + this.image);
    }
  }

  startVideo(event: any): void {
    this.curVid = this.element.nativeElement.getElementsByClassName('video');
    this.vid.vfile.play();
    this.playTime = false;
    setTimeout(() => {
      this.showButton = false;
      this.showNavBar = false;
    }, 2000);
  }

  pauseVideo(event: any): void {
    this.curVid.pause();
    this.playTime = true;
    this.showNavBar = true;
    this.showButton = true;
  }

  backToOriginal() {
    this.playTime = true;
    this.showButton = true;
    this.showNavBar = true;
  }

  async deleteVideo(event: any) {
    // Ask if the user wants to delete for real.
    const action = await this.actionSheet.create({
      header: 'Deleting Video',
      buttons: [{
        text: 'Delete',
        handler: () => {
          this.deleteForReal();
        }
      }, {
        text: 'cancel',
        role: 'cancel',
        handler: () => {
          console.log('cancelled');
        }
      }]
    });
    await action.present();
  }

  deleteForReal() {
    // this.callDelete().then(() => {
    //     this.navCtrl.pop();
    // });
    // this.imageService.deleteCover({hangoutId: this.hangoutId, imageId: this.imgId}, this.type).subscribe((res: any) => {
    //   console.log(res.message);
    //   this.image = null;
    //   this.new = true;
    // });
  }

  close() {
    this.modalCtrl.dismiss({
      new: this.new,
      vid: this.vid,
      vidId: this.vidId
    });
  }

  toggleNavBar() {
    this.showNavBar = !this.showNavBar;
  }

}
