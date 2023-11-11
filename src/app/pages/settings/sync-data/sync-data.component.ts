import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { IonicSafeString } from '@ionic/angular';
import * as dayjs from 'dayjs';
import { Subject, takeUntil } from 'rxjs';

import { authService, LanguageService, SyncDataService, TimerService } from '@services/index';

import { AppConstant, AppUtil } from '@utilities/index';

import { AlertComponent, RadioOption, ToastComponent } from '@components/index';
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
  public selectedSyncData?: ITrip;

  constructor(
    private authService: authService,
    private syncDataService: SyncDataService,
    private toastComponent: ToastComponent,
    private alertComponent: AlertComponent,
    private languageService: LanguageService,
    private timerService: TimerService
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
              tripTime: item.tripTime,
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

  public handleSelectedData(data: string) {
    this.selectedSyncData = JSON.parse(JSON.stringify(data));
  }

  public async showConfirm() {
    if (!this.selectedSyncData) return;

    this.alertComponent.presentAlert({
      buttons: [
        {
          role: 'cancel',
          text: this.languageService.translate('cancel'),
        },
        {
          handler: async () => {
            await this.importData();
          },
          text: this.languageService.translate('import'),
        },
      ],
      header: this.languageService.translate('areYouSureYouWantToImportThisData'),
      //TODO modify calc service
      message: new IonicSafeString(`
                                    <div>
                                      <div class='flex justify-between'>
                                        <p>${this.languageService.translate('avgSpeed')}</p>
                                        <p>${AppUtil.toFixedNoRounding(
                                          (this.selectedSyncData.avgSpeedTotalDistance /
                                            this.selectedSyncData.avgSpeedTotalTime) *
                                            3.6,
                                          2
                                        )} ${AppConstant.unit.metric.speedUnit}</p>
                                      </div>
                                    
                                      <div class='flex justify-between'>
                                        <p>${this.languageService.translate('topSpeed')}</p>
                                        <p>${
                                          this.selectedSyncData.topSpeed
                                            ? this.selectedSyncData.topSpeed * 3.6
                                            : '-'
                                        } ${AppConstant.unit.metric.speedUnit}</p>
                                      </div>

                                      <div class='flex justify-between'>
                                        <p>${this.languageService.translate('trip')}</p>
                                        <p>${AppUtil.toFixedNoRounding(
                                          this.selectedSyncData.tripDistance / 1000,
                                          2
                                        )} ${AppConstant.unit.metric.distanceUnit}</p>
                                      </div>

                                      <div class='flex justify-between'>
                                        <p>${this.languageService.translate('time')}</p>
                                        <p>${this.timerService.formatTime(
                                          this.selectedSyncData.tripTime
                                        )}</p>
                                      </div>
                                    </div>`),
    });
  }

  private async importData() {
    if (!this.selectedSyncData) return;

    await this.syncDataService.setTripValue(this.selectedSyncData);
    this.toastComponent.presentToast({ color: AppConstant.color.success, msg: 'dataImported' });
    await this.alertComponent.dismissAlert();
    this.buttonClick();
  }

  public async exportData() {
    this.syncDataService.setBackupValue();
  }
}
