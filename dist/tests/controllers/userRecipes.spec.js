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
    wrongUsernameSignIn = _mockData2.default.wrongUsernameSignIn,
    wrongPasswordSignIn = _mockData2.default.wrongPasswordSignIn,
    signupUser = _mockData2.default.signupUser,
    emailInUseSignUp = _mockData2.default.emailInUseSignUp,
    usernameInUseSignUp = _mockData2.default.usernameInUseSignUp,
    wrongEmailFormat = _mockData2.default.wrongEmailFormat;


_chai2.default.use(_chaiHttp2.default);

describe('USER CONTROLLER', function () {

  describe('Retrieve User Recipes', function () {

    before(function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/users/signin').send(signinUser1).end(function (error, response) {
        user1Token = response.body.token;
        user1 = response.body.user;
      });
      _chai2.default.request(_app2.default).post('/api/v1/users/signin').send(signinUser3).end(function (error, response) {
        user3Token = response.body.token;
        user3 = response.body.user;
      });
      _chai2.default.request(_app2.default).post('/api/v1/users/signin').send(signinUser2).end(function (error, response) {
        user2Token = response.body.token;
        user2 = response.body.user;
        done();
      });
    });

    it('should return all recipes created by a user when called by that user', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/users/myrecipes').set('token', user1Token).end(function (error, response) {
        console.log(error);
        expect(response).to.have.status(200);
        expect(response.body.myRecipes[0].name).to.equal('Fried Noodles');
        expect(response.body.myRecipes[0].userId).to.equal(user1.id);
        done();
      });
    });
    it('should return an error if user is not signed in', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/users/myrecipes').end(function (error, response) {
        expect(response).to.have.status(401);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Unauthenticated');
        done();
      });
    });
    it('should return an error if signed in user has no recipes', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/users/myrecipes').set('token', user3Token).end(function (error, response) {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('You have no recipes');
        done();
      });
    });
    it('should return all recipes created by a user when requested by another signed in user', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/users/1/recipes').set('token', user3Token).end(function (error, response) {
        expect(response).to.have.status(200);
        expect(response.body.recipes[0].name).to.equal('Fried Noodles');
        expect(response.body.recipes[0].userId).to.equal(user1.id);
        done();
      });
    });
    it('should return an error if the user calling the route isn\'t signed in', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/users/1/recipes').end(function (error, response) {
        expect(response).to.have.status(401);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Unauthenticated');
        done();
      });
    });
    it('should return an error if the id of the user requested does not exist', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/users/10/recipes').set('token', user1Token).end(function (error, response) {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('User not found');
        done();
      });
    });
    it('should return an error if the user being requested has no recipes', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/users/3/recipes').set('token', user1Token).end(function (error, response) {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('User has no recipes');
        done();
      });
    });
    it('should return an error if the id of the user requested is not an integer', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/users/Rachel/recipes').set('token', user1Token).end(function (error, response) {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Invalid request');
        done();
      });
    });
  });
});