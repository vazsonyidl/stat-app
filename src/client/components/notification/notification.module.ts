import {NgModule} from '@angular/core';

import {NotificationService} from 'services/notification.service';
import {NotificationComponent} from './notification.component';

@NgModule({
  declarations: [NotificationComponent],
  exports: [NotificationComponent],
  providers: [NotificationService]
})
export class NotificationModule {
}
