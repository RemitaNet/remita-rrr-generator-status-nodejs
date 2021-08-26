var https = require('https');
var cryptoJS = require('crypto-js');

//Base urls
var demoUrl = "remitademo.net";
var liveUrl = "https://login.remita.net";

//Path
var genRRRUrlPath = "/remita/exapp/api/v1/send/api/echannelsvc/merchant/api/paymentinit";

//Credentials
var merchantId = "2547916";
var apiKey = "1946";
var serviceTypeId = "4430731";
var totalAmount = "100";
var d = new Date();
var orderId = d.getTime();

var payerName = "Michelle Alozie";
var payerEmail = "alozie@systemspecs.com.ng";
var payerPhone = "09062067384";
var description = "Payment for Donation 3";

//Encryption
var apiHash = cryptoJS.SHA512(merchantId + serviceTypeId + orderId + totalAmount + apiKey);
// console.log('apiHash: ' + apiHash);

//Request
var options = {
    host: demoUrl,
    path: genRRRUrlPath,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'remitaConsumerKey=' + merchantId + ',remitaConsumerToken=' + apiHash
    },
    body: {
        'serviceTypeId': serviceTypeId,
        'amount': totalAmount,
        'orderId': orderId,
        'payerName': payerName,
        'payerEmail': payerEmail,
        'payerPhone': payerPhone,
        'description': description
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
