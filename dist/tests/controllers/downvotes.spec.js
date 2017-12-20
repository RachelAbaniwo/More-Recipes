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
    recipe1 = _mockData2.default.recipe1,
    updateRecipe = _mockData2.default.updateRecipe;


_chai2.default.use(_chaiHttp2.default);

describe('DOWNVOTES CONTROLLER', function () {

  describe('Add Downvote', function () {

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

    it('should add a downvote to a recipe when called by a signed in User', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes/4/downvote').set('token', user2Token).end(function (error, response) {
        expect(response).to.have.status(201);
        expect(response.body.message).to.equal('Recipe downvoted successfully');
        done();
      });
    });
    it('should add a downvote to a recipe and remove upvote if recipe was previously upvoted', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes/1/downvote').set('token', user2Token).end(function (error, response) {
        expect(response).to.have.status(201);
        expect(response.body.message).to.equal('Recipe downvoted successfully');
        done();
      });
    });
    it('should remove a downvote from a recipe when called twice for the same recipe by the same user', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes/6/downvote').set('token', user2Token).end(function (error, response) {
        _chai2.default.request(_app2.default).post('/api/v1/recipes/6/downvote').set('token', user2Token).end(function (error, response) {
          expect(response).to.have.status(200);
          expect(response.body.message).to.equal('Successfully removed downvote from this recipe');
          done();
        });
      });
    });
    it('should return an error if user trying to add a downvote isn\'t signed In', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes/4/downvote').end(function (error, response) {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthenticated USER.');
        done();
      });
    });
    it('should return an error if user is trying to add a downvote to a recipe that doesn\'t exist', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes/10/downvote').set('token', user1Token).end(function (error, response) {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('Recipe not found.');
        done();
      });
    });
    it('should return an error if User is trying to downvote a recipe with an ID that isn\'t an integer', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes/Rachel/downvote').set('token', user1Token).end(function (error, response) {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid Request.');
        done();
      });
    });
    it('should return an error if User is trying to add a downvote to a personal recipe', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes/1/downvote').set('token', user1Token).end(function (error, response) {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthorized.');
        done();
      });
    });
  });
});