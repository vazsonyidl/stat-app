'use strict';

const request = require('request');

module.exports = {
    getBirthSchema: async (req, resp) => {
        const options = {
            method: 'GET',
            url: 'https://andmed.stat.ee/api/v1/en/stat/RV11',
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
    }
};
