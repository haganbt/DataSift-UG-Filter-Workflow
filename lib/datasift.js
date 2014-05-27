'use strict';
var request = require('request')
    ;

// Private
var b = 2;
function sum(x, y) {
    return x + y;
}



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
                'Authorization': 'un:api',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        // handle response
        function callback(error, response, body) {

            /*
            if (!error && response.statusCode === 200) {
                cb(false, body);
            } else {
                cb(false, response.body);
            }*/

            if(error){
                cb(false, error, body);
            } else {
                cb(false, response, body);
            }
        }

        request.post(options, callback);
    }
};