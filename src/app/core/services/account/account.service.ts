import { Injectable } from '@angular/core';
import { Auth, User, user } from '@angular/fire/auth';
import { DocumentData } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

import { FirebaseService } from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  docRef = 'users';

  userDetail$: BehaviorSubject<User | null>;

  constructor(private auth: Auth, private firebaseService: FirebaseService) {
    this.userDetail$ = new BehaviorSubject<User | null>(null);
    this.getDetail();
  }

  public get userDetail() {
    return this.userDetail$;
  }

  public getDetail() {
    user(this.auth).subscribe((userDetail: User | null) => {
      if (userDetail) {
        this.firebaseService
          .getById(this.docRef, userDetail.uid)
          .subscribe((user: DocumentData | undefined) => {
            this.userDetail$.next({
              ...userDetail,
              displayName: user?.['params'].displayName || null,
              photoURL: user?.['params'].photoURL || null,
            });
          });
      }
    });
  }

  public updateInformation(uid: string, params: User) {
    this.firebaseService.set(this.docRef, { params }, uid);
  }
}
