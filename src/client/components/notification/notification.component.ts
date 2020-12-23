import {Component, Inject, InjectionToken} from '@angular/core';

export const CONTAINER_DATA = new InjectionToken<{}>('CONTAINER_DATA');

@Component({
  selector: 'app-notification',
  templateUrl: './notification.template.html',
})
export class NotificationComponent {
  constructor(
    @Inject(CONTAINER_DATA) public componentData: any) {
  }
}
