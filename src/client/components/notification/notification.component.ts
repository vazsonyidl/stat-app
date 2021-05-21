import {Component, Inject, Output} from '@angular/core';
import {CONTAINER_DATA} from './notification.const';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.template.html',
  styleUrls: ['./notification.style.scss']
})
export class NotificationComponent {
  @Output() readonly disappearAnimationEnded: Subject<boolean> = new Subject<boolean>();

  constructor(@Inject(CONTAINER_DATA) public readonly notificationData: string) {
  }

  onAnimationEnd(event: AnimationEvent) {
    if (event.animationName === 'disappear-notification') this.disappearAnimationEnded.next(true);
  }
}
