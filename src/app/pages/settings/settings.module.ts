import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared/shared.module';

import { AccountComponent } from './account/account.component';
import { ClearDataComponent } from './clear-data/clear-data.component';
import { LanguageSelectListComponent } from './language-list/language-list.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsPage } from './settings.page';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { SpeedCorrectionComponent } from './speed-correction/speed-correction.component';
import { SyncDataComponent } from './sync-data/sync-data.component';
import { UnitListComponent } from './unit-list/unit-list.component';

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
    SyncDataComponent,
  ],
  imports: [IonicModule, CommonModule, SettingsRoutingModule, TranslateModule, SharedModule],
})
export class SettingsPageModule {}
