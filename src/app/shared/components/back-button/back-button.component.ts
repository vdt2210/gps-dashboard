import { Component } from '@angular/core';

import { AppRoutes } from '@utilities/app-routes';

@Component({
  selector: 'app-back-button',
  styleUrls: ['./back-button.component.scss'],
  templateUrl: './back-button.component.html',
})
export class BackButtonComponent {
  public appRoutes = AppRoutes;
}
