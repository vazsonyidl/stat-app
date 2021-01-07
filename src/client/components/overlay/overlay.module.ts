import {NgModule} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import {OverlayComponent} from './overlay.component';

@NgModule({
  imports: [MatProgressBarModule],
  declarations: [OverlayComponent],
  exports: [OverlayComponent],
})
export class OverlayModule {
}
