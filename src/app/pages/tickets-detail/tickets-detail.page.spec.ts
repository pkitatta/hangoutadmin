import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TicketsDetailPage } from './tickets-detail.page';

describe('TicketsDetailPage', () => {
  let component: TicketsDetailPage;
  let fixture: ComponentFixture<TicketsDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TicketsDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
