const request = require('request');

module.exports = {
  getUnemploymentSchema : async (req, resp) => {
    console.log(req.query);
    const options = {
      method: 'GET',
      url: 'https://andmed.stat.ee/api/v1/en/stat/TT442',
      headers: {
        "content-type": "application/json",
        useQueryString: true
      }
    };
    request(options, (error, response, body)  => error ? resp.error({error: 'An error occurred'}) : resp.send(body));
  }
}
