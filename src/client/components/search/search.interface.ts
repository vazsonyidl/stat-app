export enum MultipleSelectionEnum {
  YEAR = 'Year',
  COUNTY = 'County'
}

export interface SearchSchemaInterface {
  type: Array<NameUrlPair>;
}

export interface NameUrlPair {
  name: string;
  url: string;
}

export interface SearchSchemaVariable {
  code: string;
  text: string;
  values: Array<string>;
  valueTexts: Array<string>;
}

export interface TransformedSchema {
  code: string;
  text: string;
  value: { [key: string]: string };
  multiple: boolean;
}

export interface SearchResponse {
  columns: Array<ResponseColumns>;
  comments: Array<unknown>;
  data: Array<ResponseData>;
  metadata: Array<ResponseMetaData>;
}

export interface SearchResponseData {
  data: Array<{
    key: Array<string>;
    year: Array<string>;
    value: number;
  }>;
}

export interface ResponseData {
  key: Array<string>;
  values: Array<string>;
}

interface ResponseColumns {
  code: string;
  text: string;
  type: string;
}

interface ResponseMetaData {
  label: string;
  source: string;
  updated: Date | string;
}
