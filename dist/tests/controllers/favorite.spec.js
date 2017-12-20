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
    signinUser3 = _mockData2.default.signinUser3;


_chai2.default.use(_chaiHttp2.default);

describe('FAVORITES CONTROLLER', function () {

  before(function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signin').send(signinUser1).end(function (error, response) {
      user1Token = response.body.token;
      user1 = response.body.user;
    });
    _chai2.default.request(_app2.default).post('/api/v1/users/signin').send(signinUser2).end(function (error, response) {
      user2Token = response.body.token;
      user2 = response.body.user;
    });
    _chai2.default.request(_app2.default).post('/api/v1/users/signin').send(signinUser3).end(function (error, response) {
      user3Token = response.body.token;
      user3 = response.body.user;
      done();
    });
  });

  describe('Add to Favorite List of Recipes', function () {

    it('should add a Recipe of a Signed In User\'s choice to that User\'s List of Favorite Recipes', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/favorites/2').set('token', user1Token).end(function (error, response) {
        expect(response).to.have.status(201);
        expect(response.body.message).to.equal('Recipe successfully added to Favorites!');
        done();
      });
    });
    it('should remove a Recipe from a Signed In User\'s List of Favorite Recipes when called twice for the same Recipe', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/favorites/3').set('token', user2Token).end(function (error, response) {
        _chai2.default.request(_app2.default).post('/api/v1/favorites/3').set('token', user2Token).end(function (error, response) {
          expect(response).to.have.status(200);
          expect(response.body.message).to.equal('Successfully removed this recipe from Favorites');
          done();
        });
      });
    });
    it('should return an error if User trying to add a recipe to his/her Favorites isn\'t signed in', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/favorites/3').end(function (error, response) {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthenticated USER.');
        done();
      });
    });
    it('should return an error if a User is trying to add a recipe that doesn\'t exist to List of Favorites', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/favorites/10').set('token', user1Token).end(function (error, response) {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('Recipe not found.');
        done();
      });
    });
    it('should return an error if User is trying to add a recipe with an ID that isn\'t an integer to List of Favorites', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/favorites/Rachel').set('token', user1Token).end(function (error, response) {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid Request.');
        done();
      });
    });
    it('should return an error if User is trying to add a Personal recipe to List of Favorites', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/favorites/1').set('token', user1Token).end(function (error, response) {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthorized.');
        done();
      });
    });
  });

  describe('Retrieve User\'s List of Favorites', function () {

    it('should return a User\'s List of Favorites', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/favorites').set('token', user2Token).end(function (error, response) {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.recipes[0].userId).to.equal(user1.id);
        done();
      });
    });
    it('should return an Error if User has no Recipe in List of Favorites', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/favorites').set('token', user3Token).end(function (error, response) {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('You have no Favorite Recipes');
        done();
      });
    });
    it('should return an Error if User is not Signed In', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/favorites').end(function (error, response) {
        expect(response).to.have.status(401);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Unauthenticated USER.');
        done();
      });
    });
  });
});