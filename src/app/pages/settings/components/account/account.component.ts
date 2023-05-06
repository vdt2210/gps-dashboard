import { Component, EventEmitter, Output } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { authService } from 'src/app/core/services/auth/auth.service';
import AppConstant from 'src/app/utilities/app-constant';

@Component({
  selector: 'app-account',
  styleUrls: ['./account.component.scss'],
  templateUrl: './account.component.html',
})
export class AccountComponent {
  @Output() buttonEmit = new EventEmitter();

  public appConstant = AppConstant;

  constructor(private authService: authService, private auth: Auth) {
    console.log(this.auth);
  }

  public onLogOut() {
    this.authService.logOut();
    this.buttonClick('login');
  }

  buttonClick(action?: string) {
    this.buttonEmit.emit(action);
  }
}
