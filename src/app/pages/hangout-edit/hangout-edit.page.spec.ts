import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HangoutEditPage } from './hangout-edit.page';

describe('HangoutEditPage', () => {
  let component: HangoutEditPage;
  let fixture: ComponentFixture<HangoutEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HangoutEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HangoutEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
