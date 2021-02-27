import {SearchSchemaVariable} from 'components/search/search.interface';

export const dummySchema: Array<SearchSchemaVariable> = [
  {
    code: 'Maakond',
    text: 'County',
    values: ['00', '37'],
    valueTexts: ['Whole country', 'Harju county'],
  }, {
    code: 'Aasta',
    text: 'Year',
    values: ['2004', '2005'],
    valueTexts: ['2004', '2005'],
  }
];

export const dummySearchResult = {
  columns: [
    {code: 'Maakond', text: 'County', type: 'd'},
    {code: 'Aasta', text: 'Year', type: 't'},
    {code: 'HT042: PREPRIMARY INSTITUTIONS', text: 'HT042: PREPRIMARY INSTITUTIONS', type: 'c'}
  ],
  comments: [],
  data: [
    {
      key: ['37', '2006'],
      values: ['205']
    }
  ],
  metadata: [{
    updated: '2013-07-04T05:00:00Z',
    label: 'HT042: PREPRIMARY INSTITUTIONS by County and Year',
    source: 'Statistics Estonia'
  }]
};
