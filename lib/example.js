 var request    = require('request')
    ;


exports.doCompile = function(csdl, cb){

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

    function callback(error, response, body) {

        if (!error && response.statusCode === 200) {
            cb(false, body);
        }

        // catch bad csdl
        if (!error && response.statusCode === 400 && response && response.body) {
            //cb(false, {error:'Invalid CSDL'});
            cb(false, response.body);
        }

        if(error){
            cb(false, error);
        }

    }

    request.post(options, callback);

};