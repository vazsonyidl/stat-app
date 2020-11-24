const request = require('request');
const query = {
  "query": [
    {
      "code": "Aasta",
      "selection": {
        "filter": "item",
        "values": [
          "2019"
        ]
      }
    },
    {
      "code": "Näitaja",
      "selection": {
        "filter": "item",
        "values": [
          "1"
        ]
      }
    }
  ],
  "response": {
    "format": "json"
  }
};

const options = {
  method: 'POST',
  url: 'https://andmed.stat.ee/api/v1/en/stat/RV031',
  json: query,
  headers: {
    "content-type": "application/json",
    useQueryString: true
  }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body.data);
});
