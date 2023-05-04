import { Injectable } from '@angular/core';
import AppConstant from 'src/app/utilities/app-constant';
import { StorageService } from '../storage/storage.service';
import { BehaviorSubject } from 'rxjs';
import { UnitParams } from '../../models/unit.model';

@Injectable({
	providedIn: 'root',
})
export class UnitService {
	private unitParams$: BehaviorSubject<UnitParams>;

	constructor(private storageService: StorageService) {
		this.unitParams$ = new BehaviorSubject<UnitParams>({
			value: '',
			lengthUnit: '',
			speedUnit: '',
			distanceUnit: '',
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
