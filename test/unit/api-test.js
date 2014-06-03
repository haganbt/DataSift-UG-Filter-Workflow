'use strict';
process.env.NODE_ENV = 'test';

var request = require('superagent');
var expect = require("chai").expect;
var should = require('should');
var util = require('../../lib/util');
var server;
var config = require('../../config');


var un = config.datasift.ds_username;
var key = config.datasift.ds_api_key;


describe('#REST API', function() {

    var previewId = '';
    var app = require('../../app');

    before(function(){
        server = app.listen(3000);

        it('- /API/CREATE resource', function(done) {

            var params  = {};
            params.start = Math.floor((Date.now() / 1000) - (60 * 60 * 3)); // start is 3 hours ago
            params.end = Math.floor((Date.now() / 1000) - (60 * 60 * 2)); // end is 2 hours ago
            params.hash = '74d786b7bca4ab3bfa2e8fa7e7bec275';
            params.sources = 'twitter';
            params.parameters = 'language.tag,freqDist,10';

            request.post('localhost:3000/api/create' )
                .type('form')
                .send(util.serialize(params))
                .set('Authorization', un+':'+key)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .end(function(err, res){
                    previewId = res.body.id;
                    expect(res).to.exist;
                    should.not.exist(err);
                    res.should.have.status(202);
                    res.text.should.include('id');
                    res.text.should.include('created_at');
                    done();
                });
        });

    });


    it('- /API/COMPILE resource', function(done) {
        request.post('localhost:3000/api/compile' )
            .type('form')
            .send('csdl='+encodeURIComponent('interaction.content any "orange"'))
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

        it('- /API/PREVIEW resource', function(done) {
            request.get('localhost:3000/api/preview/'+previewId )
                .type('form')
                .set('Authorization', un+':'+key)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .end(function(err, res){
                    expect(res).to.exist;
                    should.not.exist(err);
                    res.should.have.status(202);
                    res.text.should.include('progress');
                    done();
                });
        });

        server.close();
    });

});