import { Component } from '@angular/core';
import { AlertController, AlertOptions } from '@ionic/angular';

@Component({
  selector: 'app-alert',
  template: '',
})
export class AlertComponent {
  constructor(private alertController: AlertController) {}

  public async presentAlert({ header, message, buttons }: AlertOptions) {
    const alert = await this.alertController.create({
      buttons,
      header,
      message,
    });
    await alert.present();
  }

  public async dismissAlert() {
    await this.alertController.dismiss();
  }
}
