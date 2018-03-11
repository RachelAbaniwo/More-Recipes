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
    wrongCharacterSignUp = _mockData2.default.wrongCharacterSignUp,
    wrongEmailSignIn = _mockData2.default.wrongEmailSignIn,
    wrongPasswordSignIn = _mockData2.default.wrongPasswordSignIn,
    signupUser = _mockData2.default.signupUser,
    emailInUseSignUp = _mockData2.default.emailInUseSignUp,
    usernameInUseSignUp = _mockData2.default.usernameInUseSignUp,
    wrongEmailFormat = _mockData2.default.wrongEmailFormat,
    wrongEmailFormatSignIn = _mockData2.default.wrongEmailFormatSignIn;


_chai2.default.use(_chaiHttp2.default);

describe('USER CONTROLLER', function () {

  describe('User Sign up', function () {

    describe('Check for Validation', function () {

      it('should Register a new user if all fields are filled appropriately with unique details', function (done) {
        _chai2.default.request(_app2.default).post('/api/v1/users/signup').send(signupUser).end(function (error, response) {
          expect(response).to.have.status(201);
          expect(response.body).to.have.property('token');
          expect(response.body).to.have.property('user');
          expect(response.body.user.firstname).to.equal('Henry');
          expect(response.body.user.email).to.equal('henrynek@test.com');
          expect(response.body.message).to.equal('Successfully signed up!');
          done();
        });
      });
      it('should return correct validation error if new user doesn\'t fill all specified fields', function (done) {
        _chai2.default.request(_app2.default).post('/api/v1/users/signup').send({}).end(function (error, response) {
          expect(response).to.have.status(400);
          var errors = response.body.errors;
          expect(errors).to.include('First name is required!');
          expect(errors).to.include('Last name is required!');
          expect(errors).to.include('Choose a user name!');
          expect(errors).to.include('Email Address is required!');
          expect(errors).to.include('Choose a password');

          expect(response.body.message).to.equal('Please fix the validation errors');
          done();
        });
      });
      it('should return correct validation errors if new user fills in invalid characters and wrong number of characters', function (done) {
        _chai2.default.request(_app2.default).post('/api/v1/users/signup').send(wrongCharacterSignUp).end(function (error, response) {
          expect(response).to.have.status(400);
          var errors = response.body.errors;
          expect(errors).to.include('Your first name should have a minimum of 3 characters');
          expect(errors).to.include('Your last name should have a minimum of 3 characters');
          expect(errors).to.include('Your user name should have a minimum of 3 characters');
          expect(errors).to.include('Email format is wrong, enter valid email address');
          expect(errors).to.include('Your password should have a minimum of 6 characters');
          expect(response.body.message).to.equal('Please fix the validation errors');
          done();
        });
      });
      it('should return correct error if new user registers with an email already in use', function (done) {
        _chai2.default.request(_app2.default).post('/api/v1/users/signup').send(emailInUseSignUp).end(function (error, response) {
          expect(response).to.have.status(400);
          expect(response.body.message).to.equal('The Email already exists.');
          done();
        });
      });
      it('should return correct error if new user registers with a user name already in use', function (done) {
        _chai2.default.request(_app2.default).post('/api/v1/users/signup').send(usernameInUseSignUp).end(function (error, response) {
          expect(response).to.have.status(400);
          expect(response.body.message).to.equal('The Username is already in use.');
          done();
        });
      });
      it('should return correct error if new user registers with an email with a wrong format', function (done) {
        _chai2.default.request(_app2.default).post('/api/v1/users/signup').send(wrongEmailFormat).end(function (error, response) {
          var errors = response.body.errors;
          expect(response).to.have.status(400);
          expect(errors).to.include('Email format is wrong, enter valid email address');
          expect(response.body.message).to.equal('Please fix the validation errors');
          done();
        });
      });
    });
  });

  describe('User Sign In', function () {

    describe('Check for Authentication', function () {

      it('Should sign in a user if correct log in credentials are filled', function (done) {
        _chai2.default.request(_app2.default).post('/api/v1/users/signin').send(signinUser1).end(function (error, response) {
          expect(response).to.have.status(200);
          expect(response.body).to.have.property('token');
          expect(response.body.user.email).to.equal('rachel.abaniwo@test.com');
          expect(response.body.message).to.equal('Successfully signed in.');
          done();
        });
      });
      it('should return correct error if wrong password is inputed by the user', function (done) {
        _chai2.default.request(_app2.default).post('/api/v1/users/signin').send(wrongPasswordSignIn).end(function (error, response) {
          expect(response).to.have.status(422);
          expect(response.body.message).to.equal('Wrong credentials');
          done();
        });
      });
      it('should return correct error if email address of the user signing in is not found', function (done) {
        _chai2.default.request(_app2.default).post('/api/v1/users/signin').send(wrongEmailSignIn).end(function (error, response) {
          expect(response).to.have.status(422);
          expect(response.body.message).to.equal('Wrong credentials');
          done();
        });
      });
      it('should return correct error if user does not fill all fields when signing in', function (done) {
        _chai2.default.request(_app2.default).post('/api/v1/users/signin').send({}).end(function (error, response) {
          expect(response).to.have.status(400);
          var errors = response.body.errors;
          expect(errors).to.include('Email Address is required!');
          expect(errors).to.include('Password is required!');
          expect(response.body.message).to.equal('Please fix the validation errors');
          done();
        });
      });
      it('should return correct error if user fills in email address with wrong format', function (done) {
        _chai2.default.request(_app2.default).post('/api/v1/users/signin').send(wrongEmailFormatSignIn).end(function (error, response) {
          expect(response).to.have.status(400);
          var errors = response.body.errors;
          expect(errors).to.include('Email format is wrong, enter valid email address');
          expect(response.body.message).to.equal('Please fix the validation errors');
          done();
        });
      });
    });
  });
});