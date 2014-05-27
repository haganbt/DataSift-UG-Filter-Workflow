var express = require('express');
var router = express.Router();

/* POST compile. */
router.get('/compile', function(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({insecticons : ["Shrapnel","Bombshell", "Kickback"]}));
    res.end();
});



module.exports = router;
