import {APP_INITIALIZER, NgModule} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';

import {initAppFactory, InitService} from 'services/init.service';

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initAppFactory,
      deps: [InitService],
      multi: true
    },
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    },
    InitService
  ]
})
export class InitModule {
}
