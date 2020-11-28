import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {NotFoundPageComponent} from './not-found.page';

@NgModule({
  imports: [RouterModule,],
  declarations: [NotFoundPageComponent],
  exports: [NotFoundPageComponent],
})
export class NotFoundPageModule {
}
