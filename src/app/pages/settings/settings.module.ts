import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { AccountComponent } from './components/account/account.component';
import { ClearDataComponent } from './components/clear-data/clear-data.component';
import { LanguageSelectListComponent } from './components/language-list/language-list.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { SpeedCorrectionComponent } from './components/speed-correction/speed-correction.component';
import { UnitListComponent } from './components/unit-list/unit-list.component';
import { SettingsPage } from './settings.page';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  declarations: [
    SettingsPage,
    AccountComponent,
    LoginFormComponent,
    SignUpFormComponent,
    LanguageSelectListComponent,
    UnitListComponent,
    SpeedCorrectionComponent,
    ClearDataComponent,
  ],
  imports: [IonicModule, CommonModule, SettingsRoutingModule, TranslateModule, SharedModule],
})
export class SettingsPageModule {}
