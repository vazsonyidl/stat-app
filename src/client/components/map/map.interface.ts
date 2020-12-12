export interface Counties {
  type: string;
  features: Array<CountyFeature>;
}

export interface CountyFeature {
  type: string;
  properties: CountyProperty;
  geometry: CountyGeometry;
}

interface CountyProperty {
  name: string;
  code: string;
  value?: number;
}

interface CountyGeometry {
  type: string;
  coordinates: Array<any>;
}
