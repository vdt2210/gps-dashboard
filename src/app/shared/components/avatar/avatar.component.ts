import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  styleUrls: ['./avatar.component.scss'],
  templateUrl: './avatar.component.html',
})
export class AvatarComponent {
  @Input() src = '';
}
