import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DrinkAddPage } from './drink-add.page';

describe('DrinkAddPage', () => {
  let component: DrinkAddPage;
  let fixture: ComponentFixture<DrinkAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinkAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DrinkAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
