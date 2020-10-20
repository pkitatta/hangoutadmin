import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuImageModalPage } from './menu-image-modal.page';

describe('MenuImageModalPage', () => {
  let component: MenuImageModalPage;
  let fixture: ComponentFixture<MenuImageModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuImageModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuImageModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
