import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { AvatarComponent } from './components/avatar/avatar.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { ButtonComponent } from './components/button/button.component';
import { ButtonCardComponent } from './components/button-card/button-card.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { IconOnlyButtonComponent } from './components/icon-only-button/icon-only-button.component';
import { InputComponent } from './components/input/input.component';
import { RadioComponent } from './components/radio/radio.component';
import { RangeComponent } from './components/range/range.component';

@NgModule({
  declarations: [
    ButtonCardComponent,
    InputComponent,
    ButtonComponent,
    IconOnlyButtonComponent,
    BackButtonComponent,
    AvatarComponent,
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
    AvatarComponent,
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
