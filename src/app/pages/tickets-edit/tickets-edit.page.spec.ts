import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TicketsEditPage } from './tickets-edit.page';

describe('TicketsEditPage', () => {
  let component: TicketsEditPage;
  let fixture: ComponentFixture<TicketsEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TicketsEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
