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

describe('UPVOTES CONTROLLER', function () {

  describe('Add Upvote', function () {

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

    it('should add an Upvote to a Recipe when called by a signed in user', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes/5/upvote').set('token', user1Token).end(function (error, response) {
        expect(response).to.have.status(201);
        expect(response.body.recipe.id).to.equal(5);
        expect(response.body.recipe.upvotes).to.equal(1);
        expect(response.body.message).to.equal('Recipe upvoted successfully');
        done();
      });
    });
    it('should add an upvote to a recipe and remove downvote if recipe was previously downvoted', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes/2/upvote').set('token', user1Token).end(function (error, response) {
        expect(response).to.have.status(201);
        expect(response.body.recipe.id).to.equal(2);
        expect(response.body.recipe.downvotes).to.equal(0);
        expect(response.body.recipe.upvotes).to.equal(1);
        expect(response.body.message).to.equal('Recipe upvoted successfully');
        done();
      });
    });
    it('should remove an upvote from a recipe when called twice for the same recipe by the same user', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes/6/upvote').set('token', user2Token).end(function (error, response) {
        _chai2.default.request(_app2.default).post('/api/v1/recipes/6/upvote').set('token', user2Token).end(function (error, response) {
          expect(response).to.have.status(200);
          expect(response.body.recipe.id).to.equal(6);
          expect(response.body.recipe.upvotes).to.equal(0);
          expect(response.body.message).to.equal('Successfully removed upvote from this recipe');
          done();
        });
      });
    });
    it('should return an error if user trying to add an upvote isn\'t signed In', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes/6/upvote').end(function (error, response) {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthenticated');
        done();
      });
    });
    it('should return an error if user is trying to add an upvote to a recipe that doesn\'t exist', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes/10/upvote').set('token', user1Token).end(function (error, response) {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('Recipe not found.');
        done();
      });
    });
    it('should return an error if user is trying to upvote a recipe with an ID that isn\'t an integer', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes/Rachel/upvote').set('token', user1Token).end(function (error, response) {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid request.');
        done();
      });
    });
    it('should return an error if User is trying to add an upvote to a personal recipe', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes/1/upvote').set('token', user1Token).end(function (error, response) {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthorized');
        done();
      });
    });
  });
});