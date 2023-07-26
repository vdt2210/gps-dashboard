import { Component, EventEmitter, Output } from '@angular/core';

import { UnitService } from '@services/unit/unit.service';

import { AppConstant } from '@utilities/index';

import { RadioOption } from '@components/radio/radio.component';

@Component({
  selector: 'app-unit-list',
  styleUrls: ['./unit-list.component.scss'],
  templateUrl: './unit-list.component.html',
})
export class UnitListComponent {
  @Output() buttonEmit = new EventEmitter();

  public appConstant = AppConstant;
  public selectedUnit: string = this.unitService.getUnit().getValue().value;
  public unitsList: RadioOption[] = Object.values(AppConstant.unit).map((el) => ({
    label: el.value,
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
