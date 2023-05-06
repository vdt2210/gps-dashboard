import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { InformationCardComponent } from './components/information-card/information-card.component';
import { DashboardPage } from './dashboard.page';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, DashboardRoutingModule, TranslateModule, SharedModule],
  declarations: [DashboardPage, InformationCardComponent],
})
export class DashboardPageModule {}
