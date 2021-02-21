import {NgModule} from '@angular/core';

import {CountyStore} from 'stores/county.store';
import {MapComponent} from './map.component';
import {MapService} from './map.service';

@NgModule({
  declarations: [MapComponent],
  exports: [MapComponent],
  providers: [MapService, CountyStore]
})
export class MapModule {
}
