'use strict';
var request = require('request')
    , config = require('../test/config')
    ;

// Private
var un = config.datasift.ds_username;
var key = config.datasift.ds_api_key;



// Public
module.exports = {
    // compile CSDL
    compile: function(csdl, cb){

        var encCsdl = 'csdl='+encodeURIComponent(csdl);
        var options = {
            method: 'POST',
            body: encCsdl,
            uri: 'http://api.datasift.com/v1/compile',
            headers: {
                'Authorization': un+':'+key,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        // handle response
        function callback(error, response, body) {
            if(error){
                cb(false, error, body);
            } else {
                cb(false, response, body);
            }
        }

        request.post(options, callback);
    }
};