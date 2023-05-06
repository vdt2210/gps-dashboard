import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsPage } from './settings.page';

const routes: Routes = [
  {
    component: SettingsPage,
    path: '',
  },
];
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class SettingsRoutingModule {}
