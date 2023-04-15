import { Injectable } from "@angular/core";
import AppConstant from "src/app/utilities/app-constant";
import { StorageService } from "../storage/storage.service";
import { BehaviorSubject } from "rxjs";
import { UnitParams } from "../../models/unit.model";

@Injectable({
	providedIn: "root",
})
export class UnitService {
	private unitParams$: BehaviorSubject<UnitParams>;

	constructor(private storageService: StorageService) {
		this.unitParams$ = new BehaviorSubject<UnitParams>({
			unit: "",
			lengthUnit: "",
			speedUnit: "",
			distanceUnit: "",
		});

		this.setInitialUnit();
	}

	public async setInitialUnit() {
		const unit =
			(await this.storageService.get(AppConstant.storageKeys.unit)) ??
			AppConstant.unitSystem.metric.unit;
		this.setUnit(unit);
	}

	public getUnit() {
		return this.unitParams$;
	}

	public async setUnit(unit: string) {
		const unitSystem = this.getUnitSystem(unit);

		await this.storageService.set(AppConstant.storageKeys.unit, unit);
		this.unitParams$.next(unitSystem);
	}

	public getUnitSystem(unit: string) {
		switch (unit) {
			case AppConstant.unitSystem.imperial.unit:
				return AppConstant.unitSystem.imperial;
			default:
				return AppConstant.unitSystem.metric;
		}
	}
}
