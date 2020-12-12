import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {filter, tap, map} from 'rxjs/operators';
import * as L from 'leaflet';
import cloneDeep from 'lodash/cloneDeep';

import {Counties, CountyFeature} from './map.interface';
import {countyData} from './counties.constant';
import {SearchService} from '../search/search.service';
import {SearchResponse} from '../search/search.interface';

@Component({
  selector: 'app-map',
  templateUrl: './map.template.html',
  styleUrls: ['map.style.scss']
})
export class MapComponent implements AfterViewInit {
  private mapboxAccessToken: string = 'pk.eyJ1IjoidmF6c29ueWlkbCIsImEiOiJja2h1bDR5N2kwbG5rMnJwNWYxcDBwbHlkIn0.JxBr1cJpNuKEEr341pdc0A';
  private constructedMap;
  @ViewChild('map', {static: true}) private map: ElementRef;

  constructor(searchService: SearchService) {
    searchService.searchResponse.pipe(
      filter(response => !!response),
      map((response: SearchResponse) => this.transformMapData(response)),
      tap((mapData: Counties) => L.geoJson(mapData, {style: this.style}).addTo(this.constructedMap))
    ).subscribe();
  }

  ngAfterViewInit(): void {
    this.constructedMap = L.map(this.map.nativeElement, {
      maxBounds: [[70, -10], [50, 50]]
    }).setView([58.65, 25.50], 6.5);

    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=` + this.mapboxAccessToken, {
      id: 'mapbox/light-v9',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.constructedMap);
  }

  private getColor = (d) => {
    return d > 1000 ? '#800026' :
      d > 500 ? '#BD0026' :
        d > 200 ? '#E31A1C' :
          d > 100 ? '#FC4E2A' :
            d > 50 ? '#FD8D3C' :
              d > 20 ? '#FEB24C' :
                d > 10 ? '#FED976' :
                  '#FFEDA0';
  };

  private style = (feature) => {
    return {
      fillColor: this.getColor(feature.properties.value),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  };

  private transformMapData(response: SearchResponse): Counties {
    const _countyData = cloneDeep(countyData);
    let filteredFeatures;
    for (const data of response.data) {
      filteredFeatures = _countyData.features.filter((feature: CountyFeature) => data.key.includes(feature.properties.code));
    }

    return {..._countyData, features: filteredFeatures};
  }
}
