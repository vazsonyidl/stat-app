import {NgModule} from '@angular/core';
import {MapComponent} from './map.component';
import {MapService} from './map.service';

@NgModule({
  declarations: [MapComponent],
  exports: [MapComponent],
  providers: [MapService]
})
export class MapModule {
}
