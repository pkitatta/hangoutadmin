import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuAddPage } from './menu-add.page';

describe('MenuAddPage', () => {
  let component: MenuAddPage;
  let fixture: ComponentFixture<MenuAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
