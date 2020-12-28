export const endpoints = [
  {
    route: '/births',
    methods: ['GET', 'POST'],
    url: 'https://andmed.stat.ee/api/v1/en/stat/RV11'
  },
  {
    route: '/unemployment_rate',
    methods: ['GET', 'POST'],
    url: 'https://andmed.stat.ee/api/v1/en/stat/TT442'
  },
  {
    route: '/education_preprimary',
    methods: ['GET', 'POST'],
    url: 'https://andmed.stat.ee/api/v1/en/stat/HT042'
  },
  {
    route: '/pensioners',
    methods: ['GET', 'POST'],
    url: 'https://andmed.stat.ee/api/v1/en/stat/SK12'
  },
];


