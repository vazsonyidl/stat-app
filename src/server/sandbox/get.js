import https from "https";

(function() {
    const options = {
        host: 'andmed.stat.ee',
        path: '/api/v1/en/stat/KE01',
        method: 'GET'
    };

    const myRequest = https.request(options, function(myResponse) {
        console.log('STATUS: ' + myResponse.statusCode);
        console.log('HEADERS: ' + JSON.stringify(myResponse.headers)); 
        
        myResponse.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
    });

    myRequest.end();
})();