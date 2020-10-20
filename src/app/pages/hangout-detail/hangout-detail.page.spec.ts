import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HangoutDetailPage } from './hangout-detail.page';

describe('HangoutDetailPage', () => {
  let component: HangoutDetailPage;
  let fixture: ComponentFixture<HangoutDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HangoutDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HangoutDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
