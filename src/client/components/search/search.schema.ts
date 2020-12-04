import {SearchSchemaInterface} from "./search.interface";

export const searchSchema: SearchSchemaInterface = {
  type: [
    {name: 'Unemployment rate by county', url: '/api/unemployment_rate'},
    {name: 'Preprimary education by county', url: '/api/education_preprimary'}
    ]
};
