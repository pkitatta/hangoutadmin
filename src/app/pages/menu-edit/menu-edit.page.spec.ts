import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuEditPage } from './menu-edit.page';

describe('MenuEditPage', () => {
  let component: MenuEditPage;
  let fixture: ComponentFixture<MenuEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
