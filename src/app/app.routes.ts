import { Routes } from '@angular/router';
import { AppRoutes } from './utilities/app-routes';

export const routes: Routes = [
  {
    path: AppRoutes.dashboard.path,
    loadComponent: () =>
      import('./pages/dashboard/dashboard.page').then((m) => m.DashboardPage),
  },
  {
    path: '',
    redirectTo: AppRoutes.dashboard.path,
    pathMatch: 'full',
  },
];
