const expect   = require('chai').expect,
      request  = require('supertest');
     
const app = require('../app');
const checkAuth = require('../api/middleware/checkAuth');

describe('GET /products', function () {
    this.timeout(30000);
    it('should get list of products', function (done) {
        request('http://localhost:3000/')
        .get('products/')
        .set('Content-Type', 'application/json')
        .expect(200)
        .expect(function(res) {
            expect(res.body);
            expect(res.body.results).to.have.lengthOf.at.least(1);
        })
        .end(function(err, res) {
            done(err);
        });
    });
});


describe('GET /orders with JWT header is passed', function() {
    this.timeout(30000);
    it('should get list of all orders', function(done) {
        request.agent('http://localhost:3000/')
        .get('orders/')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQHRlc3QuY29tIiwidXNlcklkIjoiNWJiMGZlYTc5YWIyNzUwYzYxZTBhZThjIiwiaWF0IjoxNTM5MDA2NTEyLCJleHAiOjE1Mzk2MTEzMTJ9.8-AlxDZ7zdnyLY7WUBOn_lmR5Tw1V7VZSzP42VeO-FM')
        .expect(200)
        .expect(function(res) {
            //expect(res.body);
            expect(res.body).to.have.property('count');
            expect(res.body).to.have.property('orders');
            expect(res.body.orders).to.have.lengthOf.at.least(1);
        })
        .end(function(err, res) {
            done(err);
        });
    });
});