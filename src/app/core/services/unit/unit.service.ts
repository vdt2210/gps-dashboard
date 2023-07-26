import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { StorageService } from '@services/index';

import { AppConstant } from '@utilities/index';

import { UnitParams } from '@models/index';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  private unitParams$: BehaviorSubject<UnitParams>;

  constructor(private storageService: StorageService) {
    this.unitParams$ = new BehaviorSubject<UnitParams>({
      distanceUnit: '',
      lengthUnit: '',
      speedUnit: '',
      value: '',
    });

    this.setInitialUnit();
  }

  public async setInitialUnit() {
    const unit =
      (await this.storageService.get(AppConstant.storageKeys.unit)) ??
      AppConstant.unit.metric.value;
    this.setUnit(unit);
  }

  public getUnit() {
    return this.unitParams$;
  }

  public async setUnit(unit: string) {
    await this.storageService.set(AppConstant.storageKeys.unit, unit);
    this.unitParams$.next(this.getUnitSystem(unit));
  }

  private getUnitSystem(unit: string) {
    switch (unit) {
      case AppConstant.unit.imperial.value:
        return AppConstant.unit.imperial;
      default:
        return AppConstant.unit.metric;
    }
  }
}
