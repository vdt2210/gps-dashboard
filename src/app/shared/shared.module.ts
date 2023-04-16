import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ButtonCardComponent } from "./components/button-card/button-card.component";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { InputComponent } from "./components/input/input.component";
import { ButtonComponent } from "./components/button/button.component";
import { AvatarComponent } from "./components/avatar/avatar.component";

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		TranslateModule,
	],
	declarations: [
		ButtonCardComponent,
		InputComponent,
		ButtonComponent,
		AvatarComponent,
	],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		ButtonCardComponent,
		InputComponent,
		ButtonComponent,
		AvatarComponent,
	],
})
export class SharedModule {}
