'use strict';
process.env.NODE_ENV = 'test';

var request = require('superagent');
var expect = require("chai").expect;
var should = require('should');
var express = require('express'); // 'express' is used in bodyParser if needed
var server;


describe('#REST API', function() {

    var app = require('../../app');

    before(function(){
        server = app.listen(3000);
    });

    it('- /API/COMPILE resource', function(done) {
        request.post('localhost:3000/api/compile')
            .send({ foo: 'bar', baz: 'blaaah' })
            .end(function(err, res){
                expect(res).to.exist;
                should.not.exist(err);
                res.should.have.status(200);
                res.text.should.include('dpu');
                done();
            });
    });

    after(function() {
        server.close();
    });

});