import {Component, Inject, Output} from '@angular/core';
import {CONTAINER_DATA} from './notification.const';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-notification',
  template: `
    <div class="container" (animationend)="onAnimationEnd($event)">
      <div class="progress-bar"></div>
      <div class="notification">
        {{notificationData}}
      </div>
    </div>
  `,
  styleUrls: ['./notification.style.scss']
})
export class NotificationComponent {
  @Output() readonly disappearAnimationEnded: Subject<boolean> = new Subject<boolean>();

  constructor(@Inject(CONTAINER_DATA) public readonly notificationData: string) {
  }

  public onAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'disappear-notification') this.disappearAnimationEnded.next(true);
  }
}
