import { Injectable } from '@angular/core';
import { Auth, User, user } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

import { LoaderService } from '../loader/loader.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  userDetail$: BehaviorSubject<User | null>;

  constructor(private auth: Auth, private loaderServer: LoaderService) {
    this.userDetail$ = new BehaviorSubject<User | null>(null);
    this.getUserDetail();
  }

  public get userDetail() {
    return this.userDetail$;
  }

  public getUserDetail() {
    this.loaderServer.show();
    user(this.auth).subscribe((userDetail: User | null) => {
      this.loaderServer.hide();
      this.userDetail$.next(userDetail);
    });
  }
}
