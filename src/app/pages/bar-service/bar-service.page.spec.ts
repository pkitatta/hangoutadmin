import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BarServicePage } from './bar-service.page';

describe('BarServicePage', () => {
  let component: BarServicePage;
  let fixture: ComponentFixture<BarServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarServicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BarServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
