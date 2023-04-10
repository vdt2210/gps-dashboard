import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardPage } from "./dashboard.page";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { TranslateModule } from "@ngx-translate/core";
import { InformationCardComponent } from "./components/information-card/information-card.component";

@NgModule({
	imports: [IonicModule, CommonModule, DashboardRoutingModule, TranslateModule],
	declarations: [DashboardPage, InformationCardComponent],
})
export class DashboardPageModule {}

