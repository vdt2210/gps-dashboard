import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { authService } from 'src/app/core/services/auth/auth.service';
import { DeviceInfo } from 'src/app/core/services/device/device.model';
import { DeviceService } from 'src/app/core/services/device/device.service';
import { SyncDataService } from 'src/app/core/services/sync-data/sync-data.service';
import APP_CONSTANT from 'src/app/utilities/app-constant';

@Component({
  selector: 'app-sync-data',
  styleUrls: ['./sync-data.component.scss'],
  templateUrl: './sync-data.component.html',
})
export class SyncDataComponent implements OnInit, OnDestroy {
  @Output() buttonEmit = new EventEmitter();

  private onDestroy$: Subject<void> = new Subject<void>();

  public appConstant = APP_CONSTANT;
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
