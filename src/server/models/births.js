const request = require('request');

module.exports = {
    getBirthSchema : async (req, resp) => {
      const options = {
      method: 'GET',
      url: 'https://andmed.stat.ee/api/v1/en/stat/RV031',
      headers: {
        "content-type": "application/json",
        useQueryString: true
      }
    };
    request(options, (error, response, body)  => error ? resp.error({error: 'An error occurred'}) : resp.send(body));
  }
}
