import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

import { loginParams, signUpParams } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class authService {
  constructor(private auth: Auth) {}

  public get currentUser() {
    return this.auth.currentUser;
  }

  public async signUp(params: signUpParams) {
    try {
      return await createUserWithEmailAndPassword(this.auth, params.email, params.password);
    } catch (error) {
      return;
    }
  }

  public async login(params: loginParams) {
    try {
      return await signInWithEmailAndPassword(this.auth, params.email, params.password);
    } catch (error) {
      return;
    }
  }

  public logOut() {
    return signOut(this.auth);
  }
}
