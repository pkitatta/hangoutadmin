import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HangoutServiceCreationPage } from './hangout-service-creation.page';

describe('HangoutServiceCreationPage', () => {
  let component: HangoutServiceCreationPage;
  let fixture: ComponentFixture<HangoutServiceCreationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HangoutServiceCreationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HangoutServiceCreationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
