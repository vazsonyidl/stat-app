import {NgModule} from '@angular/core';

import {NotificationComponent} from './notification.component';
import {NotificationService} from '../../services/notification.service';

@NgModule({
  declarations: [NotificationComponent],
  exports: [NotificationComponent],
  providers: [NotificationService]
})
export class NotificationModule {
}
