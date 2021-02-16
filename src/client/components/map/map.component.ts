import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {filter, tap, map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import * as L from 'leaflet';

import {MapService} from './map.service';
import {SearchService} from '../search/search.service';
import {SearchResponse} from '../search/search.interface';
import {Counties, CountyFeature} from './map.interface';

@Component({
  selector: 'app-map',
  templateUrl: './map.template.html',
  styles: [`
    .map {
      height: 700px;
    }
  `]
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  private constructedMap;
  private geoJsonLayer;
  private destroy = new Subject<boolean>();
  @ViewChild('map', {static: true}) private map: ElementRef;

  constructor(
    private readonly searchService: SearchService,
    private readonly mapService: MapService) {
  }

  ngOnInit() {
    this.searchService.searchResponse.pipe(
      takeUntil(this.destroy),
      filter(response => !!response),
      map((response: SearchResponse) => this.transformResponse(response)),
      map((response) => this.mapService.filterCounties(response.data)),
      tap((mapData: Counties) => this.setLayers(mapData))
    ).subscribe();
  }

  ngAfterViewInit(): void {
    this.constructedMap = L.map(this.map.nativeElement, {
      maxBounds: [[70, -10], [50, 50]]
    }).setView([58.65, 25.50], 6.5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a>',
      maxZoom: 10,
    }).addTo(this.constructedMap);
  }

  ngOnDestroy(): void {
    this.searchService.searchResponse.next(null);
    this.destroy.next(true);
    this.destroy.complete();
  }

  private setLayers = (mapData: Counties): void => {
    if (this.geoJsonLayer) this.removeLayer(this.geoJsonLayer);
    this.geoJsonLayer = L.geoJson(mapData, {
      style: this.mapService.style,
      onEachFeature: MapComponent.appendTooltipOnLayer
    });
    this.geoJsonLayer.addTo(this.constructedMap);
  };

  private removeLayer = (layer: any) => this.constructedMap.removeLayer(layer);

  private transformResponse = (response: SearchResponse) => {
    const responseData = response.data.map((value => ({
        key: value.key.filter(val => val.match(/^[0-9]{2}$/g)),
        year: value.key.filter(val => val.match(/^[0-9]{4}$/g)),
        value: +value.values
      })
    ));

    return {...response, data: responseData};
  };

  private static appendTooltipOnLayer = (feature: CountyFeature, layer) => {
    const {name, value} = feature?.properties;
    layer.on('mouseover', () =>
      layer.bindTooltip(
        `${name} ${value}`, {direction: 'top', opacity: 0.9}
      ).openTooltip()
    );
  };
}
