const expect   = require('chai').expect,
      request  = require('supertest');
     
const app = require('../app');
const checkAuth = require('../api/middleware/checkAuth');

const productId = '5bb0ee0c9521720ada9ba89e';
const orderId   = '5bb4c933d7af15040533d09c';

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

describe('GET /products/' + productId, function() {
    this.timeout(30000);
    it('should return error for the given product as product is not present in database', function(done) {
        request('http://localhost:3000/')
        .get('/products/' + productId)
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQHRlc3QuY29tIiwidXNlcklkIjoiNWJiMGZlYTc5YWIyNzUwYzYxZTBhZThjIiwiaWF0IjoxNTM5MTAxNTQzLCJleHAiOjE1Mzk3MDYzNDN9.FmK_SsJFQPKKcFfGXFzE_YonkFo5AqBZw11ptwdUwI0')
        .expect(401)
        .expect(function(res) {
            expect(res.body).to.be.an('object').to.have.any.keys('error', 'message');
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
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQHRlc3QuY29tIiwidXNlcklkIjoiNWJiMGZlYTc5YWIyNzUwYzYxZTBhZThjIiwiaWF0IjoxNTM5MTAxNTQzLCJleHAiOjE1Mzk3MDYzNDN9.FmK_SsJFQPKKcFfGXFzE_YonkFo5AqBZw11ptwdUwI0')
        .expect(200)
        .expect(function(res) {
            expect(res.body).to.have.property('count');
            expect(res.body).to.have.property('orders');
            expect(res.body.orders).to.have.lengthOf.at.least(1);
        })
        .end(function(err, res) {
            done(err);
        });
    });
});


describe('GET /orders ', function() {
    this.timeout(30000);
    it('should get order details of the given orders', function(done) {
        request.agent('http://localhost:3000/')
        .get('orders/5bb4c933d7af15040533d09c')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQHRlc3QuY29tIiwidXNlcklkIjoiNWJiMGZlYTc5YWIyNzUwYzYxZTBhZThjIiwiaWF0IjoxNTM5MTAxNTQzLCJleHAiOjE1Mzk3MDYzNDN9.FmK_SsJFQPKKcFfGXFzE_YonkFo5AqBZw11ptwdUwI0')
        .expect(200)
        .expect(function(res) {
            expect(res.body).to.have.property('order');
            expect(res.body).to.have.property('request');
        })
        .end(function(err, res) {
            done(err);
        });
    });
});