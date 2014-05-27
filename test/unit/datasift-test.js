'use strict';
process.env.NODE_ENV = 'test';

var server;
var ds = require('../../lib/datasift');


describe('#DataSift Lib', function() {

    var app = require('../../app');
    before(function(){
        server = app.listen(3000);
    });

    it('- testing the compile method', function(done) {

        ds.compile('interaction.content ANY "apple"', function (err, response, body) {
            if (err) throw err;

            console.log(body);
            done();
        });


    });

    after(function() {
        server.close();
    });
});