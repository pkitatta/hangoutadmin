import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuDetailPage } from './menu-detail.page';

describe('MenuDetailPage', () => {
  let component: MenuDetailPage;
  let fixture: ComponentFixture<MenuDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
