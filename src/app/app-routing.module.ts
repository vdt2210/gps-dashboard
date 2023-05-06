import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './utilities/app-routes';

const routes: Routes = [
  {
    path: AppRoutes.dashboard.path,
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then((m) => m.DashboardPageModule),
  },
  {
    path: AppRoutes.settings.path,
    loadChildren: () =>
      import('./pages/settings/settings.module').then((m) => m.SettingsPageModule),
  },
  {
    path: '',
    redirectTo: AppRoutes.dashboard.path,
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
