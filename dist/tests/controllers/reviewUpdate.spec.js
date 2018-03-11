'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

var _mockData = require('../mockData');

var _mockData2 = _interopRequireDefault(_mockData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
var expect = _chai2.default.expect;
var user1Token = void 0,
    user2Token = void 0,
    user3Token = void 0,
    user1 = void 0,
    user2 = void 0,
    user3 = void 0;

var signinUser1 = _mockData2.default.signinUser1,
    signinUser2 = _mockData2.default.signinUser2,
    signinUser3 = _mockData2.default.signinUser3,
    review1 = _mockData2.default.review1,
    review2 = _mockData2.default.review2;


_chai2.default.use(_chaiHttp2.default);

describe('REVIEW CONTROLLER', function () {

  describe('Update Review', function () {

    before(function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/users/signin').send(signinUser1).end(function (error, response) {
        user1Token = response.body.token;
        user1 = response.body.existingUser;
      });
      _chai2.default.request(_app2.default).post('/api/v1/users/signin').send(signinUser2).end(function (error, response) {
        user2Token = response.body.token;
        user2 = response.body.existingUser;
      });
      _chai2.default.request(_app2.default).post('/api/v1/users/signin').send(signinUser3).end(function (error, response) {
        user3Token = response.body.token;
        user3 = response.body.existingUser;
        done();
      });
    });

    it('should return an error if User trying to update a review is not Signed in', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/reviews/1').send(review2).end(function (error, response) {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthenticated');
        done();
      });
    });
    it('should return an error if Review to be updated is not found', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/reviews/10').set('token', user2Token).send(review2).end(function (error, response) {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('Review not found');
        done();
      });
    });
    it('should return an error if the review to be updated is not a review made by the signed in user', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/reviews/1').set('token', user2Token).send(review2).end(function (error, response) {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthorized');
        done();
      });
    });
    it('should return an error if the review id of the recipe to be updated is not an integer', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/reviews/Rachel').set('token', user3Token).send(review2).end(function (error, response) {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid request');
        done();
      });
    });
    it('should retain previous review if field is empty or if empty spaces are filled into update field', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/reviews/1').set('token', user1Token).send({ review: '  ' }).end(function (error, response) {
        expect(response).to.have.status(201);
        var review = response.body.review;
        expect(review.id).to.equal(1);
        expect(review.review).to.equal('This is Awesome');
        expect(response.body.message).to.equal('Successfully updated your review');
        done();
      });
    });
    it('should update only reviews created by a signed in user', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/reviews/1').set('token', user1Token).send(review2).end(function (error, response) {
        expect(response).to.have.status(201);
        expect(response.body.review.review).to.equal('Nice!');
        expect(response.body.message).to.equal('Successfully updated your review');
        done();
      });
    });
  });
});