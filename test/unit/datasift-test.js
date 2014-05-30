'use strict';
process.env.NODE_ENV = 'test';

var server;
var ds = require('../../lib/datasift');
var util = require('../../lib/util');
var expect = require("chai").expect;
var should = require('should');
var config = require('../../test/config');

var un = config.datasift.ds_username;
var key = config.datasift.ds_api_key;


describe('#DataSift Lib', function() {

    var app = require('../../app');
    before(function(){
        server = app.listen(3000);
    });

    it('- testing the compile method', function(done) {
        ds.compile('csdl='+encodeURIComponent('interaction.content any "apple"'), un+':'+key, function (err, response, body) {
            if (err) {
                throw err;
            }
            var jbody = JSON.parse(body);
            expect(jbody.hash).to.equal("74d786b7bca4ab3bfa2e8fa7e7bec275");
            response.should.have.status(200);
            done();
        });
    });

    it('- testing the create method', function(done) {
        var params  = {};
        params.start = Math.floor((Date.now() / 1000) - (60 * 60 * 3)); // start is 3 hours ago
        params.end = Math.floor((Date.now() / 1000) - (60 * 60 * 2)); // end is 2 hours ago
        params.hash = '74d786b7bca4ab3bfa2e8fa7e7bec275';
        params.sources = 'twitter';
        params.parameters = 'language.tag,freqDist,10';

        ds.create(util.serialize(params), un+':'+key, function (err, response, body) {
            if (err) {
                throw err;
            }
            response.should.have.status(202);
            body.should.include('id');
            body.should.include('created_at');
            done();
        });
    });

    after(function() {
        server.close();
    });
});