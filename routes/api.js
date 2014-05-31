'use strict';
var   express = require('express') // 'express' is used in bodyParser if needed
    , router = express.Router()
    , ds = require('../lib/datasift')
    ;

/*
 * POST compile - wrapper to DataSift compile
 *
 */
router.post('/compile', function(req, res) {
    var auth = req.header('Authorization') || '';
    var csdl = req.rawBody || '';

    ds.compile(csdl, auth, function callback(err, response, body) {
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
 * POST create - historic preview
 *
 */
router.post('/create', function(req, res) {
    var auth = req.header('Authorization') || '';
    var params = req.rawBody || '';

    ds.create(params, auth, function callback(err, response, body) {
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
 * GET preview - get historic preview
 *
 */
router.get('/preview/:previewId', function(req, res) {

    var previewId = req.params.previewId || '';
    var auth = req.header('Authorization') || '';

    ds.preview(previewId, auth, function callback(err, response, body) {
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