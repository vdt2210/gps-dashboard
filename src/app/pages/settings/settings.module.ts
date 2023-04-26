import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsPage } from './settings.page';
import { SettingsRoutingModule } from './settings-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { LanguageSelectListComponent } from './components/language-list/language-list.component';
import { UnitListComponent } from './components/unit-list/unit-list.component';
import { SpeedCorrectionComponent } from './components/speed-correction/speed-correction.component';
import { ClearDataComponent } from './components/clear-data/clear-data.component';

@NgModule({
	imports: [IonicModule, CommonModule, SettingsRoutingModule, TranslateModule, SharedModule],
	declarations: [
		SettingsPage,
		LoginFormComponent,
		SignUpFormComponent,
		LanguageSelectListComponent,
		UnitListComponent,
		SpeedCorrectionComponent,
		ClearDataComponent,
	],
})
export class SettingsPageModule {}
