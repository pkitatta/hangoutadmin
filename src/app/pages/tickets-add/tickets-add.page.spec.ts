import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TicketsAddPage } from './tickets-add.page';

describe('TicketsAddPage', () => {
  let component: TicketsAddPage;
  let fixture: ComponentFixture<TicketsAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TicketsAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
