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

  describe('Delete Review', function () {

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

    it('should return an error if User trying to delete a review is not Signed in', function (done) {
      _chai2.default.request(_app2.default).delete('/api/v1/reviews/3').end(function (error, response) {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthenticated USER.');
        done();
      });
    });
    it('should return an error if Review to be deleted is not found', function (done) {
      _chai2.default.request(_app2.default).delete('/api/v1/reviews/10').set('token', user2Token).end(function (error, response) {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('Review not found');
        done();
      });
    });
    it('should return an error if the review to be deleted is not a review made by the Signed in User', function (done) {
      _chai2.default.request(_app2.default).delete('/api/v1/reviews/1').set('token', user2Token).end(function (error, response) {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthorized USER');
        done();
      });
    });
    it('should return an error if the review id of the recipe to be deleted is not an integer', function (done) {
      _chai2.default.request(_app2.default).delete('/api/v1/reviews/Rachel').set('token', user3Token).end(function (error, response) {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid Request');
        done();
      });
    });
    it('should delete only reviews created by a Signed in User', function (done) {
      _chai2.default.request(_app2.default).delete('/api/v1/reviews/2').set('token', user2Token).end(function (error, response) {
        expect(response).to.have.status(200);
        expect(response.body.message).to.equal('Successfully deleted your review');
        done();
      });
    });
  });
});