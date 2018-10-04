const expect   = require('chai').expect,
      request  = require('supertest');
     
const app = require('../app');

describe('GET /products', function () {
    this.timeout(30000);
    it('should get list of products', function (done) {
        request('http://localhost:3000/')
        .get('products/')
        .set('Content-Type', 'application/json')
        .expect(200)
        .expect(function(res) {
            expect(res.body);
        })
        .end(function(err, res) {
            done(err);
        });
    });
});