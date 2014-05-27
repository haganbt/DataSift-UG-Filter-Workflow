'use strict';
process.env.NODE_ENV = 'test';

var server;
var ds = require('../../lib/datasift');
var expect = require("chai").expect;
var should = require('should');


describe('#DataSift Lib', function() {

    var app = require('../../app');
    before(function(){
        server = app.listen(3000);
    });

    it('- testing the compile method', function(done) {

        ds.compile('interaction.content ANY "apple"', function (err, response, body) {
            if (err) {
                throw err;
            }

            var jbody = JSON.parse(body);
            expect(jbody.hash).to.equal("74d786b7bca4ab3bfa2e8fa7e7bec275");
            response.should.have.status(200);
            done();
        });

    });

    after(function() {
        server.close();
    });
});