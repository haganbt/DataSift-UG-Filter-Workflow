'use strict';
var   express = require('express')
    , router = express.Router()
    , ds = require('../lib/datasift')
    ;

/*
 * POST compile - wrapper to DataSift compile
 *
 * @params todo
 */
router.post('/compile', function(req, res) {

    //todo - extract api key, username, csdl from inbound request
    var csdl = 'interaction.content ANY "orange"';


    ds.compile(csdl, function callback(err, response, body) {

        if(err){
            res.status(err.status || 500);
            res.render('500', { error: err });
        }

        // Pass through the statusCode and Content-Type from the DS response object.
        res.writeHead(response.statusCode, { 'Content-Type': response.headers['content-type'] });
        res.write(body);
        res.end();
    });

});


/*
 router.get('/compile', function(req, res) {
 res.writeHead(200, { 'Content-Type': 'application/json' });
 res.write(JSON.stringify({insecticons : ["Shrapnel","Bombshell", "Kickback"]}));
 res.end();
 });

 */


module.exports = router;
