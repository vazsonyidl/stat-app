import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import {test} from "./us";

@Component({
  selector: 'app-map',
  templateUrl: './map.template.html',
  styleUrls: ['map.style.scss']
})
export class MapComponent implements AfterViewInit {
  mapboxAccessToken: string = 'pk.eyJ1IjoidmF6c29ueWlkbCIsImEiOiJja2h1bDR5N2kwbG5rMnJwNWYxcDBwbHlkIn0.JxBr1cJpNuKEEr341pdc0A';
  @ViewChild('map', {static: true}) map: ElementRef;

  ngAfterViewInit(): void {
    const map = L.map(this.map.nativeElement, {
      maxBounds: [[70, -10], [50, 50]]
    }).setView([60, 25], 5);

    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=` + this.mapboxAccessToken, {
      id: 'mapbox/light-v9',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(map);
    L.geoJson(test, {style: this.style}).addTo(map);
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
      fillColor: this.getColor(feature.properties.density),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  };
}
