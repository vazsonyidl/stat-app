const https = require('https');

module.exports = function (context, req) {
    let result = {};
    const options = {
        host: 'andmed.stat.ee',
        path: '/api/v1/en/stat/RV11',
        method: 'GET',
    };

    const request = https.request(options, function(response) {
        response.on('data', function (chunk) {
            result = chunk;
        });

        response.on('end', (d) => {
            context.res = {
                body: result
            }
            context.done();
        });
    });
    request.end();
}