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
    user4Token = void 0,
    user1 = void 0,
    user2 = void 0,
    user3 = void 0,
    user4 = void 0;
var signinUser1 = _mockData2.default.signinUser1,
    signinUser2 = _mockData2.default.signinUser2,
    signinUser3 = _mockData2.default.signinUser3,
    signinUser4 = _mockData2.default.signinUser4;


_chai2.default.use(_chaiHttp2.default);

describe('FAVORITE CONTROLLER', function () {

  describe('Delete Recipe from Favorites', function () {

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
      });
      _chai2.default.request(_app2.default).post('/api/v1/users/signin').send(signinUser4).end(function (error, response) {
        user4Token = response.body.token;
        user4 = response.body.existingUser;
        done();
      });
    });

    it('should return an error if User trying to delete a favorite recipe is not Signed in', function (done) {
      _chai2.default.request(_app2.default).delete('/api/v1/favorites/2').end(function (error, response) {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthenticated USER.');
        done();
      });
    });
    it('should return an error if Favorite Recipe to be deleted is not found', function (done) {
      _chai2.default.request(_app2.default).delete('/api/v1/favorites/10').set('token', user2Token).end(function (error, response) {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('Recipe not found');
        done();
      });
    });
    it('should return an error if the favorite recipe to be deleted isn\'t among the favorites of the Signed in User', function (done) {
      _chai2.default.request(_app2.default).delete('/api/v1/favorites/1').set('token', user1Token).end(function (error, response) {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthorized USER');
        done();
      });
    });
    it('should return an error if the id of the favorite id of the recipe to be deleted is not an integer', function (done) {
      _chai2.default.request(_app2.default).delete('/api/v1/favorites/Rachel').set('token', user2Token).end(function (error, response) {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid Request');
        done();
      });
    });
    it('should delete only the favorites of a Signed in User', function (done) {
      _chai2.default.request(_app2.default).delete('/api/v1/favorites/2').set('token', user4Token).end(function (error, response) {
        expect(response).to.have.status(200);
        expect(response.body.message).to.equal('Successfully deleted this recipe from your favorites');
        done();
      });
    });
  });
});