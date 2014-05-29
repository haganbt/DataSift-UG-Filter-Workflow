'use strict';
var request = require('request')
    ;

// Private



// Public
module.exports = {

    /*
     * compile
     *
     * @param - string
     * @param - string
     *          auth string used for the Authorization header
     *          e.g. datasift-user:your-datasift-api-key
     */
    compile: function(csdl, auth, cb){

        var options = {
            method: 'POST',
            body: csdl,
            uri: 'http://api.datasift.com/v1/compile',
            headers: {
                'Authorization': auth,
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