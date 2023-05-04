import { Component, EventEmitter, Output } from '@angular/core';
import { UnitService } from 'src/app/core/services/unit/unit.service';
import AppConstant from 'src/app/utilities/app-constant';

interface Unit {
	name: string;
	value: string;
}

@Component({
	selector: 'app-unit-list',
	templateUrl: './unit-list.component.html',
	styleUrls: ['./unit-list.component.scss'],
})
export class UnitListComponent {
	@Output() buttonEmit = new EventEmitter();

	public appConstant = AppConstant;
	public selectedUnit: string = this.unitService.getUnit().getValue().value;
	public unitsList: Unit[] = Object.values(AppConstant.unit).map((el) => ({
		name: el.value,
		value: el.value,
	}));

	constructor(private unitService: UnitService) {}

	onChangeUnit(unit: string) {
		this.selectedUnit = unit;
	}

	onConfirm() {
		this.unitService.setUnit(this.selectedUnit);
		this.buttonEmit.emit();
	}
}
