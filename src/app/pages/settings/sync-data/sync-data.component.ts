import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { DeviceService } from '@services/device/device.service';
import { authService, SyncDataService } from '@services/index';

import { AppConstant } from '@utilities/index';

import { DeviceInfo } from '@models/index';

@Component({
  selector: 'app-sync-data',
  styleUrls: ['./sync-data.component.scss'],
  templateUrl: './sync-data.component.html',
})
export class SyncDataComponent implements OnInit, OnDestroy {
  @Output() buttonEmit = new EventEmitter();

  private onDestroy$: Subject<void> = new Subject<void>();

  public appConstant = AppConstant;
  public listDevices: DeviceInfo[] = [];
  public selectedId?: string;

  constructor(
    private authService: authService,
    private deviceService: DeviceService,
    private syncDataService: SyncDataService
  ) {}

  public async ngOnInit(): Promise<void> {
    if (!(await this.authService.currentToken)) {
      this.buttonClick('login');
      return;
    }

    (await this.deviceService.getList())
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res: DeviceInfo[]) => {
        this.listDevices = res;
      });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.unsubscribe();
  }

  public buttonClick(action?: string) {
    this.buttonEmit.emit(action);
  }

  public importData() {
    if (this.selectedId) {
      //TODO show confirm popup
      this.syncDataService.getAndPatchBackupValue(this.selectedId);
      this.buttonClick();
    }
  }

  public async exportData() {
    this.syncDataService.setBackupValue();
  }
}
