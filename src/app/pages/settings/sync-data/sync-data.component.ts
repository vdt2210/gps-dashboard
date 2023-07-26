import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { authService, SyncDataService } from '@services/index';

import { AppConstant } from '@utilities/index';

import { RadioOption } from '@components/radio/radio.component';
import { TSyncData } from '@models/index';

@Component({
  selector: 'app-sync-data',
  styleUrls: ['./sync-data.component.scss'],
  templateUrl: './sync-data.component.html',
})
export class SyncDataComponent implements OnInit, OnDestroy {
  @Output() buttonEmit = new EventEmitter();

  private onDestroy$: Subject<void> = new Subject<void>();

  public appConstant = AppConstant;
  public listSyncData: TSyncData[] = [];
  public listSyncDataOptions: RadioOption[] = [];
  public selectedSyncDataId?: string;

  constructor(
    private authService: authService,
    private syncDataService: SyncDataService
  ) {}

  public async ngOnInit(): Promise<void> {
    if (!(await this.authService.currentToken)) {
      this.buttonClick('login');
      return;
    }

    (await this.syncDataService.getList())
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res: TSyncData[]) => {
        this.listSyncData = res;
        this.listSyncDataOptions = res.map((item) => ({
          label: item.deviceName,
          value: item.id,
        }));
      });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.unsubscribe();
  }

  public buttonClick(action?: string) {
    this.buttonEmit.emit(action);
  }

  public importData() {
    if (this.selectedSyncDataId) {
      //TODO show confirm popup
      console.log(this.selectedSyncDataId);

      this.syncDataService.getAndPatchBackupValue(this.selectedSyncDataId);
      this.buttonClick();
    }
  }

  public async exportData() {
    this.syncDataService.setBackupValue();
  }
}
