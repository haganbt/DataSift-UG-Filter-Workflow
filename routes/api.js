'use strict';
var   express = require('express')
    , router = express.Router()
    , ds = require('../lib/datasift')
    ;

/* POST compile. */
router.get('/compile', function(req, res) {

    ds.compile(csdl, function callback(err, res, body) {
        // pass through DS response
        res.writeHead(res.statusCode, { 'Content-Type': 'application/json' });
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
