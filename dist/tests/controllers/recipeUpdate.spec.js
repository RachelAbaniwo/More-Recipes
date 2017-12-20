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

describe('RECIPE CONTROLLER', function () {

  describe('Update Recipe', function () {

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

    it('should update the personal recipe of the Signed in User', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/recipes/4').set('token', user1Token).send(updateRecipe).end(function (error, response) {
        expect(response).to.have.status(201);
        var recipe = response.body.recipe;
        expect(recipe.id).to.equal(4);
        expect(recipe.name).to.equal('Chicken Chilli Sauce');
        expect(recipe.category).to.equal('Stews and Sauce');
        expect(response.body.message).to.equal('Successfully updated recipe');
        done();
      });
    });
    it('should return an error if User is not Signed in', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/recipes/1').send(updateRecipe).end(function (error, response) {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthenticated USER.');
        done();
      });
    });
    it('should return an error if Recipe to be updated is not found', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/recipes/10').set('token', user1Token).send(updateRecipe).end(function (error, response) {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('Recipe not found');
        done();
      });
    });
    it('should return an error if recipe to be updated is not personal recipe of the Signed in User', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/recipes/1').set('token', user2Token).send(updateRecipe).end(function (error, response) {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthorized USER');
        done();
      });
    });
    it('should return an error if the recipe id of the recipe to be updated is not an integer', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/recipes/Rachel').set('token', user1Token).send(updateRecipe).end(function (error, response) {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid Request');
        done();
      });
    });
  });
});