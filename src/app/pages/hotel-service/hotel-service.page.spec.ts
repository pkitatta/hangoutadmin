import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HotelServicePage } from './hotel-service.page';

describe('HotelServicePage', () => {
  let component: HotelServicePage;
  let fixture: ComponentFixture<HotelServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelServicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HotelServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
