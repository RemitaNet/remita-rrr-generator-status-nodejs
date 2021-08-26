var https = require('https');
var cryptoJS = require('crypto-js');

var demoUrl = "remitademo.net";
var liveUrl = "https://login.remita.net";

var merchantId = "2547916";
var apiKey = "1946";
var rrr = "250008238730";

// cryptoJS.SHA512
var apiHash = cryptoJS.SHA512(rrr + apiKey + merchantId);

var options = {
    host: demoUrl,
    path: '/remita/ecomm/' + merchantId + '/' + rrr + '/' + apiHash + '/status.reg',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'remitaConsumerKey=' + merchantId + ',remitaConsumerToken=' + apiHash
    },
    json: true
};

callback = function (response) {
    var str = ''
    response.on('error', function (error) {
        console.log(error);
    });

    response.on('data', function (chunk) {
        str += chunk;
    });

    response.on('end', function () {
        console.log('response: ' + str);
    });

}

var req = https.request(options, callback);
req.end();
