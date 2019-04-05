/*
 * co.getdata.js
 * General purpose module to get data for different functions
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/

/*global $, spa */

co.getdata = (function () {
  'use strict';

  AWS.config.region = 'us-west-2';
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({ IdentityPoolId: 'us-west-2:7f428de1-156c-410d-a485-b85f6e5c5d83' });

  var lambda = new AWS.Lambda();
  var getClients;
  var getClient;

  // get my client list
  getClients = function (_data) {

    var input = {
      ownerEmail: _data
    };

    lambda.invoke({
      FunctionName: 'getClients',
      Payload: JSON.stringify(input)
    }, function (err, data) {
      if (err) console.log(err, err.stack);
      else {
        //console.log(data.Payload)
        
        $.gevent.publish('co-got-client-data', data.Payload);
      }
    });
  };
  // 

  // get selected client details
  getClient = function (_data) {
    var input = {
      ownerEmail: _data.ownerEmail,
      uniqueId: _data.uniqueId
    };

    //var res = str.toString();
    var var1 = _data.ownerEmail.toString();
    var var2 = _data.uniqueId.toString();
    //console.log(var1 + " " + var2)
    lambda.invoke({
      FunctionName: 'getClient',
      Payload: JSON.stringify({ "ownerEmail": var1, "uniqueId": var2 })
    }, function (err, data) {
      if (err) console.log(err, err.stack);
      else {
        // console.log(data.Payload)
        // console.log(typeof data.Payload)
        $.gevent.publish('co-got-client-detail-data', data.Payload);
      }
    });
  };
  // 



  // return public methods
  return {
    getClients: getClients,
    getClient: getClient,
  };
  //------------------- END PUBLIC METHODS ---------------------
}());
