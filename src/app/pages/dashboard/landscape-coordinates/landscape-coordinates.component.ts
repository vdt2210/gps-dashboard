import { Component, Input } from '@angular/core';

import { IGeolocation } from '@models/index';

type TInformationCardGeolocationData = Pick<IGeolocation, 'latitude' | 'longitude'>;

@Component({
  selector: 'app-landscape-coordinates',
  styleUrls: ['./landscape-coordinates.component.scss'],
  templateUrl: './landscape-coordinates.component.html',
})
export class LandscapeCoordinatesComponent {
  @Input() geolocationData: TInformationCardGeolocationData = {
    latitude: '-.-',
    longitude: '-.-',
  };
}
