import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPage } from './dashboard.page';
import { HeaderComponent } from './header/header.component';
import { InformationCardComponent } from './information-card/information-card.component';

@NgModule({
  declarations: [DashboardPage, InformationCardComponent, HeaderComponent],
  imports: [IonicModule, CommonModule, DashboardRoutingModule, TranslateModule, SharedModule],
})
export class DashboardPageModule {}
