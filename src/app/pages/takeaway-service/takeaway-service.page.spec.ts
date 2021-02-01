import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TakeawayServicePage } from './takeaway-service.page';

describe('TakeawayServicePage', () => {
  let component: TakeawayServicePage;
  let fixture: ComponentFixture<TakeawayServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeawayServicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TakeawayServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
