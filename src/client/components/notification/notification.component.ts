import {Component, Inject} from '@angular/core';
import {CONTAINER_DATA} from './notification.const';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.template.html',
  styleUrls: ['./notification.style.scss']
})
export class NotificationComponent {
  constructor(
    @Inject(CONTAINER_DATA) public componentData: string) {
  }

  onAnimationEnd($event: AnimationEvent) {
  }
}
