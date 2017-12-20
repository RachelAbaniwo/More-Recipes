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
    user4Token = void 0,
    user5Token = void 0,
    user1 = void 0,
    user4 = void 0,
    user5 = void 0;

var signinUser1 = _mockData2.default.signinUser1,
    signinUser4 = _mockData2.default.signinUser4,
    signinUser5 = _mockData2.default.signinUser5,
    updateUser1 = _mockData2.default.updateUser1,
    wrongUpdateUser = _mockData2.default.wrongUpdateUser;


_chai2.default.use(_chaiHttp2.default);

describe('MODIFY USER CONTROLLER', function () {

  describe('Update User', function () {

    before(function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/users/signin').send(signinUser1).end(function (error, response) {
        user1Token = response.body.token;
        user1 = response.body.user;
      });
      _chai2.default.request(_app2.default).post('/api/v1/users/signin').send(signinUser4).end(function (error, response) {
        user4Token = response.body.token;
        user4 = response.body.user;
      });
      _chai2.default.request(_app2.default).post('/api/v1/users/signin').send(signinUser5).end(function (error, response) {
        user5Token = response.body.token;
        user5 = response.body.user;
        done();
      });
    });

    it('should return an error if user is not signed in', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/users/4').end(function (error, response) {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthenticated USER.');
        done();
      });
    });
    it('should return an error if user profile is updated by another user', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/users/4').set('token', user1Token).send(updateUser1).end(function (error, response) {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthorized USER');
        done();
      });
    });
    it('should return an error if user to be updated is not found', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/users/10').set('token', user1Token).send(updateUser1).end(function (error, response) {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('User not found');
        done();
      });
    });
    it('should return an error if the user ID of user to be updated specified is not an integer', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/users/Rachel').set('token', user1Token).send(updateUser1).end(function (error, response) {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid Request');
        done();
      });
    });
    it('should update the profile of a signed in user', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/users/4').set('token', user4Token).send(updateUser1).end(function (error, response) {
        expect(response).to.have.status(201);
        var user = response.body.user;
        expect(user.id).to.equal(4);
        expect(user.firstname).to.equal('Rach');
        expect(response.body.message).to.equal('Successfully updated profile');
        done();
      });
    });
    it('should retain previous details of the user if fields are empty or if invalid characters are filled into update fields', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/users/1').set('token', user1Token).send(wrongUpdateUser).end(function (error, response) {
        expect(response).to.have.status(201);
        var user = response.body.user;
        expect(user.id).to.equal(1);
        expect(user.firstname).to.equal('Rachel');
        expect(response.body.message).to.equal('Successfully updated profile');
        done();
      });
    });
  });
});