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

//Data
var payerName = "Michelle Alozie";
var payerEmail = "alozie@systemspecs.com.ng";
var payerPhone = "09062067384";
var description = "Payment for Donation 3";

//Encryption
var apiHash = cryptoJS.SHA512(merchantId + serviceTypeId + orderId + totalAmount + apiKey);

//Body
var data = new TextEncoder().encode(JSON.stringify({
    'serviceTypeId': serviceTypeId,
    'amount': totalAmount,
    'orderId': orderId,
    'payerName': payerName,
    'payerEmail': payerEmail,
    'payerPhone': payerPhone,
    'description': description
}))

//Request
var options = {
    host: demoUrl,
    path: genRRRUrlPath,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'remitaConsumerKey=' + merchantId + ',remitaConsumerToken=' + apiHash
    },
    data: data
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
        var response = str.substr(7, 80);
        console.log('response: ' + response);
    });

}

var req = https.request(options, callback);
req.write(data)
req.end();
