import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPage } from './dashboard.page';
import { HeaderComponent } from './header/header.component';
import { LandscapeCoordinatesComponent } from './landscape-coordinates/landscape-coordinates.component';
import { LandscapeInformationComponent } from './landscape-information/landscape-information.component';
import { PortraitInformationComponent } from './portrait-information/portrait-information.component';
import { SpeedComponent } from './speed/speed.component';
import { TotalTripDistanceComponent } from './total-trip-distance/total-trip-distance.component';

@NgModule({
  declarations: [
    DashboardPage,
    PortraitInformationComponent,
    HeaderComponent,
    TotalTripDistanceComponent,
    SpeedComponent,
    LandscapeInformationComponent,
    LandscapeCoordinatesComponent,
  ],
  imports: [IonicModule, CommonModule, DashboardRoutingModule, TranslateModule, SharedModule],
})
export class DashboardPageModule {}
