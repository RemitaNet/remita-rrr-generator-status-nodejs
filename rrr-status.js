var https = require('https');
var cryptoJS = require('crypto-js');

//Base urls
var demoUrl = "remitademo.net";
var liveUrl = "https://login.remita.net";

//Credentials
var merchantId = "2547916";
var apiKey = "1946";
var rrr = "250008238730";

//Encryption
var apiHash = cryptoJS.SHA512(rrr + apiKey + merchantId);

//Request
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

//Response
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
