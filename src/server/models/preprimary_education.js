const request = require('request');
const {transformSearchData} = require('./shared');

module.exports = {
  getPrePrimarySchema: async (req, resp) => {
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
    const query = req ? req.query : {};
    const options = {
      method: 'POST',
      url: 'https://andmed.stat.ee/api/v1/en/stat/HT042',
      json: transformSearchData(query),
      headers: {
        'content-type': 'application/json',
        useQueryString: true
      }
    };
    request(options, (error, response, body) => error ? resp.error({error: 'An error occurred'}) : resp.send(body));
  }
};
