'use strict';
process.env.NODE_ENV = 'test';

var request = require('superagent');
var expect = require("chai").expect;
var should = require('should');
var server;
var config = require('../../test/config');


var un = config.datasift.ds_username;
var key = config.datasift.ds_api_key;


describe('#REST API', function() {

    var app = require('../../app');

    before(function(){
        server = app.listen(3000);
    });

    it('- /API/COMPILE resource', function(done) {

        request.post('localhost:3000/api/compile')
            .send('interaction.content ANY "orange"')
            .set('Authorization', un+':'+key)
            .set('Content-Type', 'application/x-www-form-urlencoded')
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