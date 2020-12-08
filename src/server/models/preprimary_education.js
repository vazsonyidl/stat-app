const request = require('request');

module.exports = {
  getPrePrimaryData: async (req, resp) => {
    const options = {
      method: 'GET',
      url: 'https://andmed.stat.ee/api/v1/en/stat/HT042',
      headers: {
        'content-type': 'application/json',
        useQueryString: true
      }
    };
    request(options, (error, response, body) => error ? resp.error({error: 'An error occurred'}) : resp.send(body));
  },

  getFilteredPrePrimary: async (req, resp) => {
    const options = {
      method: 'POST',
      url: 'https://andmed.stat.ee/api/v1/en/stat/HT042',
      json: transformSearchData(req.query),
      headers: {
        'content-type': 'application/json',
        useQueryString: true
      }
    };
    request(options, (error, response, body) => error ? resp.error({error: 'An error occurred'}) : resp.send(body));
  }
};

const transformSearchData = (q) => {
  const responseType = {
    'response': {
      'format': 'json'
    }
  };
  return {
    query: Object.entries(q).map(([key, value]) => ({
        code: key,
        selection: {
          filter: 'item',
          // TODO refactor this area, do not rely on typeof comparison
          values: typeof value === 'string' ? [value] : value
        }
      })
    ),
    ...responseType
  };
};
