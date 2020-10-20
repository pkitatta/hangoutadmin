import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ThemeEditPage } from './theme-edit.page';

describe('ThemeEditPage', () => {
  let component: ThemeEditPage;
  let fixture: ComponentFixture<ThemeEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
