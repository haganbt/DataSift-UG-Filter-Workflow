'use strict';
process.env.NODE_ENV = 'test';
var request = require('supertest')
    //, should = require('should')
    //, assert = require('assert')
    , server
    ;

describe('API CALL UNIT TESTING', function(){
    var app = require('../../app');
    before(function(){
         server = app.listen(3000);
    });

    describe('GET', function(){

        it('respond with json', function(done){
            request(app)
                .get('/api/compile')
                .set('Accept', 'application/json')
                .expect('Content-Type', 'application/json')
                .expect(200, done)
                ;
        });
    });

    after(function() {
        server.close();
    });
});