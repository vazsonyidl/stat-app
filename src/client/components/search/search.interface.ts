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
  text: string;
  value: { [key: string]: string };
}
