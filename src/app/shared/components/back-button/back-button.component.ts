import { Component } from '@angular/core';
import { AppRoutes } from 'src/app/utilities/app-routes';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent {
  public appRoutes = AppRoutes;
}
