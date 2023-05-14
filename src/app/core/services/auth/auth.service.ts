import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  idToken,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import AppConstant from 'src/app/utilities/app-constant';

import { LoaderService } from '../loader/loader.service';
import { StorageService } from '../storage/storage.service';
import { loginParams, signUpParams } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class authService {
  constructor(
    private auth: Auth,
    private storageService: StorageService,
    private loaderService: LoaderService
  ) {
    this.observableToken();
  }

  public get currentToken() {
    return this.storageService.get(AppConstant.storageKeys.jwtToken);
  }

  public async signUp(params: signUpParams) {
    this.loaderService.show();
    try {
      return await createUserWithEmailAndPassword(this.auth, params.email, params.password).then(
        () => {
          return this.auth.currentUser?.getIdToken(true).then((token) => {
            this.loaderService.hide();
            return token;
          });
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
      return await signInWithEmailAndPassword(this.auth, params.email, params.password).then(() => {
        return this.auth.currentUser?.getIdToken(true).then((token) => {
          this.loaderService.hide();
          return token;
        });
      });
    } catch (error) {
      this.loaderService.hide();
      return;
    }
  }

  public async logOut() {
    this.loaderService.show();
    await signOut(this.auth).then(async () => {
      this.loaderService.hide();
      return await this.storageService.remove(AppConstant.storageKeys.jwtToken);
    });
  }

  public observableToken() {
    idToken(this.auth).subscribe((token: string | null) => {
      if (token) {
        this.storageService.set(AppConstant.storageKeys.jwtToken, token);
      } else {
        this.storageService.remove(AppConstant.storageKeys.jwtToken);
      }
    });
  }
}
