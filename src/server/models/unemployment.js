'use strict';

const request = require('request');
const {transformSearchData} = require('../shared/shared');

module.exports = {
    getUnemploymentSchema: async (req, resp) => {
        const options = {
            method: 'GET',
            url: 'https://andmed.stat.ee/api/v1/en/stat/TT442',
            headers: {
                'content-type': 'application/json',
                useQueryString: true
            }
        };
        request(options, (error, response, body) => {
            if (error) resp.error({error: 'An error occurred'});
            else {
                resp.setHeader('Cache-Control', 'max-age=7200');
                resp.send(body);
            }
        });
    },

    getFilteredUnemployment: async (req, resp) => {
        const query = req ? req.query : {};
        const options = {
            method: 'POST',
            url: 'https://andmed.stat.ee/api/v1/en/stat/TT442',
            json: transformSearchData(query),
            headers: {
                'content-type': 'application/json',
                useQueryString: true
            }
        };
        request(options, (error, response, body) => error ? resp.error({error: 'An error occurred'}) : resp.send(body));
    }
};
