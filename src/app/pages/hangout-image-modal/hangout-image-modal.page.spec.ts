import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HangoutImageModalPage } from './hangout-image-modal.page';

describe('HangoutImageModalPage', () => {
  let component: HangoutImageModalPage;
  let fixture: ComponentFixture<HangoutImageModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HangoutImageModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HangoutImageModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
