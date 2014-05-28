'use strict';
var   express = require('express') // 'express' is used in bodyParser if needed
    , router = express.Router()
    , ds = require('../lib/datasift')
    ;

/*
 * POST compile - wrapper to DataSift compile
 *
 * @params todo
 */
router.post('/compile', function(req, res) {

    var auth = req.header('Authorization') || '';
    //todo - parse CSDL
    //var csdl = JSON.parse(req.body) || '';

    ds.compile('interaction.content any "orange"', auth, function callback(err, response, body) {

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



module.exports = router;
