import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DrinkOptModalPage } from './drink-opt-modal.page';

describe('DrinkOptModalPage', () => {
  let component: DrinkOptModalPage;
  let fixture: ComponentFixture<DrinkOptModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinkOptModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DrinkOptModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
