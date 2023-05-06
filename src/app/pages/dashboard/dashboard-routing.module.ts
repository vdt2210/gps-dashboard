import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    component: DashboardPage,
    path: '',
  },
];
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class DashboardRoutingModule {}
