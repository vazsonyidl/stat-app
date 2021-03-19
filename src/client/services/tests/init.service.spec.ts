import {inject, TestBed} from '@angular/core/testing';
import {ComponentStore} from '@ngrx/component-store';
import {Observable, of} from 'rxjs';

import {Counties} from 'components/map/map.interface';
import {CountyStore} from 'stores/county.store';
import {initAppFactory, InitService} from '../init.service';

class MockCountyStore extends ComponentStore<Counties> {
  state$: Observable<Counties> = of({type: 'MockCountyStore', features: []});
  setState = (data) => this.state$ = of(data);
}

describe('Init Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InitService,
        {provide: CountyStore, useClass: MockCountyStore}
      ]
    });
  });

  function setupWindowObject(mockCountiesData: Counties) {
    function f(cb) {
      cb(mockCountiesData);
    }

    const _getInitialData = jest.fn().mockImplementation(cb => f(cb));
    Object.defineProperty(window, '_getInitialData', {
      configurable: true,
      enumerable: true,
      value: _getInitialData,
      writable: true
    });

    expect((window as any)._getInitialData).toBeDefined();
  }

  it('should be defined', inject([InitService], (service: InitService) => {
    expect(service).toBeDefined();
  }));

  it('should call initialize state', inject([InitService, CountyStore], (
    service: InitService, store: MockCountyStore) => {
    const storeStateSpy = jest.spyOn(store, 'setState');

    setupWindowObject({type: 'mock-state', features: []});
    initAppFactory(service);
    service.initApp().then();

    expect(storeStateSpy).toHaveBeenCalled();
    expect((window as any)._getInitialData).toHaveBeenCalled();
  }));

  it('should handle state initialization "nullish" values', inject([InitService, CountyStore], (
    service: InitService, store: MockCountyStore) => {
    const storeStateSpy = jest.spyOn(store, 'setState');
    const initializeFunction: jest.Mock = (window as any)._getInitialData;

    setupWindowObject(null);
    initAppFactory(service);
    service.initApp().then();

    expect(storeStateSpy).toHaveBeenCalled();
    expect(storeStateSpy).toHaveBeenCalledWith(null);
    expect(initializeFunction).toHaveBeenCalled();
    expect(initializeFunction).toHaveBeenCalledTimes(1);
  }));

  it('should initialize state', inject([InitService, CountyStore], (
    service: InitService, store: MockCountyStore) => {
    const mockStateValue = {type: 'mock-state', features: []};

    setupWindowObject(mockStateValue);
    initAppFactory(service);
    service.initApp().then();

    store.state$.subscribe(value => {
      expect(value).toEqual(mockStateValue);
    });
  }));
});
