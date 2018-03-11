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

describe('UNKNOWN ROUTES', function () {
  it('should return an error when called', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/recipes/users/favorite').end(function (error, response) {

      expect(response.body).to.equal('UNKNOWN REQUEST.');
      done();
    });
  });
});

describe('RECIPE CONTROLLER', function () {

  describe('Retrieve Recipes', function () {

    it('should return a list of all recipes when user requests for all recipes ', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/recipes').end(function (error, response) {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.recipes[0].name).to.equal('Fried Noodles');
        expect(response.body.recipes[0].id).to.equal(1);
        expect(response.body.recipes[0].userId).to.equal(1);
        done();
      });
    });
    it('should return all recipes sorted according to the property indicated by the user', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/recipes?sort=favorites').end(function (error, response) {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.recipes[0].name).to.equal('Nigerian Doughnut');
        expect(response.body.recipes[0].id).to.equal(5);
        expect(response.body.recipes[0].userId).to.equal(2);
        done();
      });
    });
    it('should search for the recipes using the keywords inputed by the user', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/recipes?search=Chicken Sauce').end(function (error, response) {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.recipes[0].name).to.equal('Chicken Sauce');
        expect(response.body.recipes[0].id).to.equal(4);
        expect(response.body.recipes[0].userId).to.equal(1);
        done();
      });
    });
    it('should return the recipe with recipe ID requested by the user', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/recipes/1').end(function (error, response) {
        var recipe = response.body.recipe;
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(recipe.name).to.equal('Fried Noodles');
        expect(recipe.id).to.equal(1);
        done();
      });
    });
    it('should return an error if the recipe requested by the user doesn\'t exist', function (done) {
      '';
      _chai2.default.request(_app2.default).get('/api/v1/recipes/10').end(function (error, response) {
        var recipe = response.body.recipe;
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Recipe not found');
        done();
      });
    });
    it('should return an error if the id of the recipe requested by the user is not an integer', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/recipes/Rachel').end(function (error, response) {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Invalid request');
        done();
      });
    });
  });

  describe('Create Recipe', function () {

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

    it('should add a new recipe when called by signed in user', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes').set('token', user1Token).send(recipe1).end(function (error, response) {
        expect(response).to.have.status(201);
        var recipe = response.body.recipe;
        expect(recipe.id).to.not.be.undefined;
        expect(recipe.name).to.equal('Ofada Rice');
        expect(recipe.category).to.equal('Rice');
        expect(recipe.ingredients).to.equal('Ofada Rice, Pepper, Olive Oil, Onions');
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Successfully created recipe');
        done();
      });
    });
    it('it should return an error if user creating recipe is not signed in', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes').send(recipe1).end(function (error, response) {
        expect(response).to.have.status(401);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Unauthenticated');
        done();
      });
    });
    it('it should return correct validation errors if wrong data is provided', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes').set('token', user1Token).send({}).end(function (error, response) {
        expect(response).to.have.status(400);
        var errors = response.body.errors;
        expect(errors).to.include('Recipe Name is required.');
        expect(errors).to.include('Recipe Category is required.');
        expect(errors).to.include('Recipe Ingredients are required.');
        expect(errors).to.include('Recipe Description is required.');
        expect(errors).to.include('Method required.');
        expect(response.body.message).to.equal('Please fill all fields');
        done();
      });
    });
  });
});