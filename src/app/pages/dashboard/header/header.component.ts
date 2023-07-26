import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { AppRoutes } from '@utilities/index';

import { EGpsStatusColor } from '@models/index';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnChanges {
  @Input() gpsStatusColor: EGpsStatusColor = '' as EGpsStatusColor;
  @Input() totalTime: string = '00:00:00';

  constructor(private router: Router) {}

  ngOnChanges(): void {
    this.updateGpsStatusIcon();
  }

  private updateGpsStatusIcon() {
    const gpsStatus = document.getElementById('gpsStatus');

    switch (this.gpsStatusColor) {
      case EGpsStatusColor.success:
        gpsStatus?.classList.remove('error-blink');
        gpsStatus?.classList.remove('standby-blink');
        break;

      case 'warning':
        gpsStatus?.classList.remove('error-blink');
        gpsStatus?.classList.remove('standby-blink');
        break;

      case 'danger':
        gpsStatus?.classList.remove('standby-blink');
        gpsStatus?.classList.add('error-blink');
        break;

      default:
        gpsStatus?.classList.remove('error-blink');
        gpsStatus?.classList.add('standby-blink');
        break;
    }
  }

  public goToSetting() {
    this.router.navigateByUrl(`/${AppRoutes.settings.path}`);
  }
}
