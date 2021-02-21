import {Injectable} from '@angular/core';
import {CountyStore} from 'stores/county.store';

export function initAppFactory(initService: InitService) {
  return () => initService.initApp();
}

@Injectable()
export class InitService {

  constructor(private readonly countyStore: CountyStore) {
  }

  public initApp(): Promise<any> {
    return new Promise<any>(resolve => {
      (window as any)._getInitialData(data => {
        this.countyStore.setState(data);
        resolve(void 0);
      });
    });
  }
}
