import {NgModule} from '@angular/core';

import {NotificationComponent} from './notification.component';
import {NotificationService} from '../../services/notification.service';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NotificationComponent],
  providers: [NotificationService]
})
export class NotificationModule {
}
