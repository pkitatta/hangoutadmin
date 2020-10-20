import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HangoutAddPage } from './hangout-add.page';

describe('HangoutAddPage', () => {
  let component: HangoutAddPage;
  let fixture: ComponentFixture<HangoutAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HangoutAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HangoutAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
