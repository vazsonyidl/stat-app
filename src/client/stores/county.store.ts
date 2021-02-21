import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';

import {Counties} from 'components/map/map.interface';

@Injectable()
export class CountyStore extends ComponentStore<Counties>{
  constructor() {
    super(null);
  }
}
