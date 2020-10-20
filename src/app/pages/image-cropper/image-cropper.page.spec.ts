import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImageCropperPage } from './image-cropper.page';

describe('ImageCropperPage', () => {
  let component: ImageCropperPage;
  let fixture: ComponentFixture<ImageCropperPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageCropperPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageCropperPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
