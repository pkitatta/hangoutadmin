import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThemeEditPageRoutingModule } from './theme-edit-routing.module';

import { ThemeEditPage } from './theme-edit.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ThemeEditPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [ThemeEditPage]
})
export class ThemeEditPageModule {}
