import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {filter, tap, map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import * as L from 'leaflet';

import {Counties} from './map.interface';
import {countyData} from './counties.constant';
import {SearchService} from '../search/search.service';
import {SearchResponse} from '../search/search.interface';

@Component({
  selector: 'app-map',
  templateUrl: './map.template.html',
  styleUrls: ['map.style.scss']
})
export class MapComponent implements OnDestroy, AfterViewInit {
  private mapboxAccessToken: string = 'pk.eyJ1IjoidmF6c29ueWlkbCIsImEiOiJja2h1bDR5N2kwbG5rMnJwNWYxcDBwbHlkIn0.JxBr1cJpNuKEEr341pdc0A';
  private constructedMap;
  private geoJsonLayer;
  private destroy = new Subject<boolean>();
  @ViewChild('map', {static: true}) private map: ElementRef;

  constructor(searchService: SearchService) {
    searchService.searchResponse.pipe(
      takeUntil(this.destroy),
      filter(response => !!response),
      map((response: SearchResponse) => this.transformResponse(response)),
      map((response) => this.filterCounties(response.data)),
      tap((mapData: Counties) => this.manageLayers(mapData))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
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

  private manageLayers = (mapData: Counties): void => {
    if (this.geoJsonLayer) this.removeLayer(this.geoJsonLayer);
    this.geoJsonLayer = L.geoJson(mapData, {style: this.style});
    this.geoJsonLayer.addTo(this.constructedMap);
  };

  private removeLayer = (layer: any) => this.constructedMap.removeLayer(layer);

  private getColor = (d): string => {
    return d > 1000 ? '#800026' :
      d > 500 ? '#BD0026' :
        d > 200 ? '#E31A1C' :
          d > 100 ? '#FC4E2A' :
            d > 50 ? '#FD8D3C' :
              d > 20 ? '#FEB24C' :
                d > 10 ? '#FED976' :
                  '#FFEDA0';
  };

  private style = (feature) => ({
    fillColor: this.getColor(feature.properties.value),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  });

  private transformResponse = (response: SearchResponse) => {
    const responseData = response.data.map((value => ({
        key: value.key.filter(val => val.match(/^[0-9]{2}$/g)),
        year: value.key.filter(val => val.match(/^[0-9]{4}$/g)),
        value: +value.values
      })
    ));

    return {...response, data: responseData};
  };

  private filterCounties = (responseData): Counties => {
    const filteredFeatures = countyData?.features?.filter(feature => responseData.some(data => data?.key.includes(feature?.properties?.code)))
      .map(feature => ({
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
