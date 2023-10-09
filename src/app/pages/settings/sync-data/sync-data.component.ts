import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import * as dayjs from 'dayjs';
import { Subject, takeUntil } from 'rxjs';

import { authService, SyncDataService } from '@services/index';

import { AppConstant } from '@utilities/index';

import { RadioOption } from '@components/index';
import { ITrip, TSyncTrip } from '@models/index';

@Component({
  selector: 'app-sync-data',
  styleUrls: ['./sync-data.component.scss'],
  templateUrl: './sync-data.component.html',
})
export class SyncDataComponent implements OnInit, OnDestroy {
  @Output() buttonEmit = new EventEmitter();

  private onDestroy$: Subject<void> = new Subject<void>();

  public appConstant = AppConstant;
  public listSyncData: ITrip[] = [];
  public listSyncDataOptions: RadioOption[] = [];
  public selectedSyncData?: string;

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
      .subscribe((res: TSyncTrip) => {
        this.listSyncData = res?.trips.sort((prev, curr) => curr.createdDate - prev.createdDate);

        this.listSyncDataOptions = res?.trips?.map((item) => {
          return {
            label: dayjs(item?.createdDate).format('DD MMMM, YYYY HH:mm:ss.SSS'),
            value: {
              avgSpeedTotalDistance: item.avgSpeedTotalDistance,
              avgSpeedTotalTime: item.avgSpeedTotalTime,
              topSpeed: item.topSpeed,
              tripDistance: item.tripDistance,
            },
          };
        });
      });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.unsubscribe();
  }

  public buttonClick(action?: string) {
    this.buttonEmit.emit(action);
  }

  public importData() {
    if (this.selectedSyncData) {
      //TODO show confirm popup

      this.syncDataService.setTripValue(JSON.parse(JSON.stringify(this.selectedSyncData)));
      this.buttonClick();
    }
  }

  public async exportData() {
    this.syncDataService.setBackupValue();
  }
}
