import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DrinkDetailPage } from './drink-detail.page';

describe('DrinkDetailPage', () => {
  let component: DrinkDetailPage;
  let fixture: ComponentFixture<DrinkDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinkDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DrinkDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
