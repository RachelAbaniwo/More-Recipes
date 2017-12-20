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
    user5Token = void 0,
    user1 = void 0,
    user5 = void 0;

var signinUser1 = _mockData2.default.signinUser1,
    signinUser5 = _mockData2.default.signinUser5;


_chai2.default.use(_chaiHttp2.default);

describe('DELETE USER CONTROLLER', function () {

  describe('Delete User', function () {

    before(function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/users/signin').send(signinUser1).end(function (error, response) {
        user1Token = response.body.token;
        user1 = response.body.existingUser;
      });
      _chai2.default.request(_app2.default).post('/api/v1/users/signin').send(signinUser5).end(function (error, response) {
        user5Token = response.body.token;
        user5 = response.body.existingUser;
        done();
      });
    });

    it('should return an error if user is not signed in', function (done) {
      _chai2.default.request(_app2.default).delete('/api/v1/users/5').end(function (error, response) {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthenticated USER.');
        done();
      });
    });
    it('should return an error if user profile is to be deleted by another user', function (done) {
      _chai2.default.request(_app2.default).delete('/api/v1/users/5').set('token', user1Token).end(function (error, response) {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthorized USER');
        done();
      });
    });
    it('should return an error if user to be deleted is not found', function (done) {
      _chai2.default.request(_app2.default).delete('/api/v1/users/10').set('token', user1Token).end(function (error, response) {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('User not found');
        done();
      });
    });
    it('should return an error if the user ID of user to be deleted specified is not an integer', function (done) {
      _chai2.default.request(_app2.default).delete('/api/v1/users/Rachel').set('token', user1Token).end(function (error, response) {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid Request');
        done();
      });
    });
    it('should delete the profile of a signed in user', function (done) {
      _chai2.default.request(_app2.default).delete('/api/v1/users/5').set('token', user5Token).end(function (error, response) {
        expect(response).to.have.status(200);
        expect(response.body.message).to.equal('Successfully deleted user');
        done();
      });
    });
  });
});