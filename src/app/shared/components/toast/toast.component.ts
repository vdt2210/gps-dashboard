import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { LanguageService } from '@services/index';

type Props = {
  msg: string;
  msgValue?: { [key: string]: string | number };
  time?: number;
  color?: string;
};

@Component({
  selector: 'app-toast',
  template: '',
})
export class ToastComponent {
  constructor(
    private toastController: ToastController,
    private languageService: LanguageService
  ) {}

  public async presentToast({ msg, msgValue, time, color }: Props) {
    this.toastController
      .dismiss()
      .then(() => {})
      .catch(() => {})
      .finally(() => {});

    await this.toastController
      .create({
        buttons: [
          {
            icon: 'close-outline',
            role: 'cancel',
            side: 'end',
          },
        ],
        color: color || 'dark',
        cssClass: 'custom-toast',
        duration: time || 2000,
        message: this.languageService.translate(msg, { msgValue }),
        mode: 'ios',
        position: 'top',
      })
      .then((toast) => {
        toast.present();
      });
  }

  public dismissToast() {
    this.toastController
      .dismiss()
      .then(() => {})
      .catch(() => {})
      .finally(() => {});
  }
}
