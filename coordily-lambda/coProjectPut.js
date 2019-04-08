/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true, esversion : 8, node: true, strict: false
*/

/*global $, AWS */


'use strict';
var AWS = require('aws-sdk');

exports.handler= async(event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();
    let responseBody = "";
    let statusCode = 0;

    const params = {
        TableName: "project",
        Item: {
            p_id: 'p1',
            p_name: 'CoOrdily'
        }
    }

    try {
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;
    } catch (err) {
        responseBody = 'Unable to PUT project: ${err}';
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body: responseBody
    };
    return response;
};