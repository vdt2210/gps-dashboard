import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';

import {
  DistanceService,
  LoaderService,
  StorageService,
  TimerService,
  TopSpeedService,
} from '@services/index';

import { AppConstant } from '@utilities/index';

import { loginParams, signUpParams } from '@models/index';

@Injectable({
  providedIn: 'root',
})
export class authService {
  constructor(
    private auth: Auth,
    private storageService: StorageService,
    private loaderService: LoaderService,
    private distanceService: DistanceService,
    private timerService: TimerService,
    private topSpeedService: TopSpeedService
  ) {
    this.observableToken();
  }

  public get currentToken() {
    return this.storageService.get(AppConstant.storageKeys.jwtToken);
  }

  public get uid() {
    return this.storageService.get(AppConstant.storageKeys.uid);
  }

  public async signUp(params: signUpParams) {
    this.loaderService.show();
    try {
      return await createUserWithEmailAndPassword(this.auth, params.email, params.password).then(
        async (auth) => {
          this.loaderService.hide();
          await auth.user.getIdToken(true);
          return auth.user.uid;
        }
      );
    } catch (error) {
      this.loaderService.hide();
      return;
    }
  }

  public async login(params: loginParams) {
    this.loaderService.show();

    try {
      return await signInWithEmailAndPassword(this.auth, params.email, params.password).then(
        async (auth) => {
          this.loaderService.hide();
          await auth.user.getIdToken(true);
          return auth.user.uid;
        }
      );
    } catch (error) {
      this.loaderService.hide();
      return;
    }
  }

  public async logOut() {
    this.loaderService.show();

    signOut(this.auth);

    await this.auth.currentUser?.getIdToken(true);

    await this.distanceService.removeTotalDistance();
    await this.timerService.resetTripTime();
    await this.topSpeedService.clearTopSpeed();

    this.loaderService.hide();
  }

  public observableToken() {
    user(this.auth).subscribe(async (detail) => {
      if (detail) {
        await this.storageService.set(AppConstant.storageKeys.uid, detail.uid);
        await this.storageService.set(AppConstant.storageKeys.jwtToken, await detail.getIdToken());
      } else {
        await this.storageService.remove(AppConstant.storageKeys.uid);
        await this.storageService.remove(AppConstant.storageKeys.jwtToken);
      }
    });
  }
}
