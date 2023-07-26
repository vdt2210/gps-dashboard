import { Component } from '@angular/core';

import { LoaderService } from '@services/loader/loader.service';

@Component({
  selector: 'app-loader',
  styleUrls: ['./loader.component.scss'],
  templateUrl: './loader.component.html',
})
export class LoaderComponent {
  constructor(public loaderService: LoaderService) {}
}
