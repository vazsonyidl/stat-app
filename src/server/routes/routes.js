import {registerGetEndpoint, registerPostEndpoint} from '../models/register-endpoint.js';
import {transformSearchData} from '../shared/shared.js';

import {endpoints} from '../constants/endpoints.const.js';
import {baseOptions} from '../constants/route-options.const.js';
import {countyData} from '../constants/counties.const.js';

const setInitialCountiesRoute = (app) => {
  app.get('/counties', (req, resp) => {
    resp.setHeader('Cache-Control', 'max-age=720000');
    resp.send(countyData);
  });
};

const setAppRoutes = (app) => {
  for (let endpoint of endpoints) {
    endpoint.methods.forEach(method => {
      if (method === 'GET') {
        app.get(endpoint.route, (req, resp) => registerGetEndpoint(req, resp, {
            ...baseOptions,
            method: method,
            url: endpoint.url
          })
        );
      } else if (method === 'POST') {
        app.post(endpoint.route, (req, resp) => registerPostEndpoint(req, resp, {
          ...baseOptions,
          method: method,
          url: endpoint.url,
          json: transformSearchData(req?.query ?? {})
        }));
      }
    });
  }
};

export {setInitialCountiesRoute, setAppRoutes};
