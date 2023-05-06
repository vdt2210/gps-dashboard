import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AppRoutes } from './utilities/app-routes';

const routes: Routes = [
  {
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then((m) => m.DashboardPageModule),
    path: AppRoutes.dashboard.path,
  },
  {
    loadChildren: () =>
      import('./pages/settings/settings.module').then((m) => m.SettingsPageModule),
    path: AppRoutes.settings.path,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRoutes.dashboard.path,
  },
];
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
})
export class AppRoutingModule {}
