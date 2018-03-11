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

  describe('Add to favorite list of recipes', function () {

    it('should add a recipe of a signed in user\'s choice to that user\'s list of favorite recipes', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/favorites/2').set('token', user1Token).end(function (error, response) {
        expect(response).to.have.status(201);
        expect(response.body.recipe.id).to.equal(2);
        expect(response.body.recipe.favorites).to.equal(1);
        expect(response.body.message).to.equal('Recipe successfully added to favorites!');
        done();
      });
    });
    it('should remove a recipe from a signed in user\'s list of favorite recipes when called twice for the same recipe', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/favorites/3').set('token', user2Token).end(function (error, response) {
        _chai2.default.request(_app2.default).post('/api/v1/favorites/3').set('token', user2Token).end(function (error, response) {
          expect(response).to.have.status(200);
          expect(response.body.recipe.id).to.equal(3);
          expect(response.body.recipe.favorites).to.equal(0);
          expect(response.body.message).to.equal('Successfully removed this recipe from favorites');
          done();
        });
      });
    });
    it('should return an error if user trying to add a recipe to his/her favorites isn\'t signed in', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/favorites/3').end(function (error, response) {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthenticated');
        done();
      });
    });
    it('should return an error if a user is trying to add a recipe that doesn\'t exist to list of favorites', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/favorites/10').set('token', user1Token).end(function (error, response) {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('Recipe not found.');
        done();
      });
    });
    it('should return an error if user is trying to add a recipe with an ID that isn\'t an integer to list of favorites', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/favorites/Rachel').set('token', user1Token).end(function (error, response) {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid request.');
        done();
      });
    });
    it('should return an error if user is trying to add a personal recipe to list of favorites', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/favorites/1').set('token', user1Token).end(function (error, response) {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthorized');
        done();
      });
    });
  });

  describe('Retrieve user\'s list of favorites', function () {

    it('should return a user\'s list of favorites', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/favorites').set('token', user2Token).end(function (error, response) {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.favoriteRecipes[0].name).to.equal('Fried Noodles');
        done();
      });
    });
    it('should return an error if user has no recipe in list of favorites', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/favorites').set('token', user3Token).end(function (error, response) {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('You have no favorite recipes');
        done();
      });
    });
    it('should return an error if user is not signed In', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/favorites').end(function (error, response) {
        expect(response).to.have.status(401);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Unauthenticated');
        done();
      });
    });
  });
});