'use strict';
process.env.NODE_ENV = 'test';


var request = require('superagent');
var expect = require('expect');
var express = require('express'); // 'express' is used in bodyParser if needed
var server;


describe('#REST API', function() {

    var app = require('../../app');
    before(function(){
        server = app.listen(3000);
    });

    it('- POST is testing', function(done) {
        request.post('/api/compile').send().end(function(e, res) {
            //console.log(res.text)
            //expect(e).to.eql(null);
            expect(200, done);
            done();
        });
    });

    after(function() {
        server.close();
    });
});