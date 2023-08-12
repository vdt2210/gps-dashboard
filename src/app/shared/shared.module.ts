import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import {
  BackButtonComponent,
  ButtonComponent,
  ButtonCardComponent,
  CheckboxComponent,
  IconOnlyButtonComponent,
  InputComponent,
  RadioComponent,
  RangeComponent,
} from '@components/index';

@NgModule({
  declarations: [
    ButtonCardComponent,
    InputComponent,
    ButtonComponent,
    IconOnlyButtonComponent,
    BackButtonComponent,
    RadioComponent,
    RangeComponent,
    CheckboxComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonCardComponent,
    InputComponent,
    ButtonComponent,
    IconOnlyButtonComponent,
    BackButtonComponent,
    RadioComponent,
    RangeComponent,
    CheckboxComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
  ],
})
export class SharedModule {}
