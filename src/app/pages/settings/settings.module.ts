import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsPage } from "./settings.page";
import { SettingsRoutingModule } from "./settings-routing.module";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "src/app/shared/shared.module";
import { LoginFormComponent } from "./components/login-modal/login-form.component";
import { SignUpFormComponent } from "./components/sign-up-form/sign-up-form.component";

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		SettingsRoutingModule,
		TranslateModule,
		SharedModule,
	],
	declarations: [SettingsPage, LoginFormComponent, SignUpFormComponent],
})
export class SettingsPageModule {}

