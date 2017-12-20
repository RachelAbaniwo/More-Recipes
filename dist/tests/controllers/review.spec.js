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
    review1 = _mockData2.default.review1;


_chai2.default.use(_chaiHttp2.default);

describe('REVIEW CONTROLLER', function () {

  describe('Add Reviews', function () {

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

    it('should add a review to the recipe with Id is specified by a Signed in User', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/reviews/1').set('token', user1Token).send(review1).end(function (error, response) {
        expect(response).to.have.status(201);
        expect(response.body.review.review).to.equal('Awesome Stuff');
        expect(response.body.message).to.equal('Review successfully added!');
        done();
      });
    });
    it('should return an error if User adding a review is not Signed in', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/reviews/1').send(review1).end(function (error, response) {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthenticated USER.');
        done();
      });
    });
    it('should return an error if the Id of the recipe to be reviewed does not exist', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/reviews/10').set('token', user1Token).send(review1).end(function (error, response) {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('Recipe to be reviewed not found');
        done();
      });
    });
    it('should return an error if the Id of the recipe to be reviewed is not an integer', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/reviews/review').set('token', user1Token).send(review1).end(function (error, response) {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid Request');
        done();
      });
    });
    it('should return an error if the Review field is empty', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/reviews/1').set('token', user2Token).send({}).end(function (error, response) {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Review field empty');
        done();
      });
    });
  });

  describe('Get Recipe Reviews', function () {

    it('it should get all the reviews of a recipe', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/reviews/1').end(function (error, response) {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.reviews[0].recipeId).to.equal(1);
        done();
      });
    });
    it('it should return an error if recipe doesn\'t exist', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/reviews/10').end(function (error, response) {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Recipe not Found');
        done();
      });
    });
    it('it should return an error if recipe doesn\'t exist', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/reviews/2').end(function (error, response) {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Recipe has no Reviews');
        done();
      });
    });
  });
});