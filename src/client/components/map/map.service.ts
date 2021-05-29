import {Injectable} from '@angular/core';
import {pluck, take, tap} from 'rxjs/operators';

import {CountyStore} from 'stores/county.store';
import {Counties} from './map.interface';

@Injectable()
export class MapService {
  constructor(private readonly countyStore: CountyStore) {
  }

  // TODO: Refactor this to calculate color based on ratio
  public getColor = (d: number): string => {
    return d > 1000 ? '#800026' :
      d > 500 ? '#BD0026' :
        d > 200 ? '#E31A1C' :
          d > 100 ? '#FC4E2A' :
            d > 50 ? '#FD8D3C' :
              d > 20 ? '#FEB24C' :
                d > 10 ? '#FED976' :
                  '#FFEDA0';
  };

  public style = (feature) => ({
    fillColor: this.getColor(feature.properties.value),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  });

  public filterCounties = (responseData): Counties => {
    // TODO: Refactor subscription - remove from service - handle this in the component
    let countyData: Counties = {type: null, features: []};
    this.countyStore.state$.pipe(
      take(1),
      pluck('counties'),
      tap((countiesData: Counties) => countyData = countiesData)
    ).subscribe();

    const filteredFeatures = countyData?.features?.filter(
      feature => responseData.some(data => data?.key.includes(feature?.properties?.code))
    ).map(feature => ({
        ...feature,
        properties: {
          ...feature?.properties,
          value: responseData.find(data => data?.key?.includes(feature?.properties.code))?.value
        }
      })
    );

    return {...countyData, features: filteredFeatures};
  };
}
