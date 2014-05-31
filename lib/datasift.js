'use strict';
var request = require('request')
    ;

// Private



// Public
module.exports = {

    /*
     * compile - compile CSDL
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

        function callback(error, response, body) {
            if(error){
                cb(false, error, body);
            } else {
                cb(false, response, body);
            }
        }

        request.post(options, callback);
    },


    /*
     * create - create historic preview
     *
     * @param - string
     * @param - string
     *
     */
    create: function(params, auth, cb){

        var options = {
            method: 'POST',
            body: params,
            uri: 'http://api.datasift.com/v1/preview/create',
            headers: {
                'Authorization': auth,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        function callback(error, response, body) {
            if(error){
                cb(false, error, body);
            } else {
                cb(false, response, body);
            }
        }

        request.post(options, callback);
    },


    /*
     * preview - get historic preview
     *
     *
     */
    preview: function(id, auth, cb){

        var options = {
            method: 'GET',
            //body: 'id='+id,
            uri: 'http://api.datasift.com/v1/preview/get?id='+id,
            headers: {
                'Authorization': auth,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

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