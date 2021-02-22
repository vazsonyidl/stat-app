import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {CONTAINER_DATA} from './notification.const';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.template.html',
  styleUrls: ['./notification.style.scss']
})
export class NotificationComponent {
  @Output() readonly disappearAnimationEnded: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(@Inject(CONTAINER_DATA) public readonly notificationData: string) {
  }

  onAnimationEnd(event: AnimationEvent) {
    if (event.animationName === 'disappear-notification') this.disappearAnimationEnded.emit(true);
  }
}
