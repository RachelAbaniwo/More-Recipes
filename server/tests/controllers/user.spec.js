/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import mockData from '../mockData'

const expect = chai.expect;
let user1Token, user2Token, user3Token, user1, user2, user3;

const { signinUser1, signinUser2, signinUser3, wrongCharacterSignUp, 
  wrongEmailSignIn, wrongPasswordSignIn, signupUser, emailInUseSignUp,
       usernameInUseSignUp, wrongEmailFormat, wrongEmailFormatSignIn } = mockData;

chai.use(chaiHttp);

describe('USER CONTROLLER', () => {
  
  describe('User Sign up', () => {

    describe('Check for Validation', () => {
    
      it('should Register a new user if all fields are filled appropriately with unique details', (done) => {
        chai.request(app)
        .post('/api/v1/users/signup')
        .send(signupUser)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.have.property('token');
          expect(response.body).to.have.property('user');
          expect(response.body.user.firstname).to.equal('Henry');
          expect(response.body.user.email).to.equal('henrynek@test.com');
          expect(response.body.message).to.equal('Successfully signed up!');
          done();
        });
      });
      it('should return correct validation error if new user doesn\'t fill all specified fields', (done) => {
        chai.request(app)
        .post('/api/v1/users/signup')
        .send({})
        .end((error, response) => {
          expect(response).to.have.status(400);
          const errors = response.body.errors;
          expect(errors).to.include('First name is required!');
          expect(errors).to.include('Last name is required!');
          expect(errors).to.include('Choose a user name!');
          expect(errors).to.include('Email Address is required!');
          expect(errors).to.include('Choose a password');

          expect(response.body.message).to.equal('Please fix the validation errors');
          done();
        });
      });
      it('should return correct validation errors if new user fills in invalid characters and wrong number of characters', (done) => {
        chai.request(app)
        .post('/api/v1/users/signup')
        .send(wrongCharacterSignUp)
        .end((error, response) => {
          expect(response).to.have.status(400);
          const errors = response.body.errors;
          expect(errors).to.include('Your first name should have a minimum of 3 characters');
          expect(errors).to.include('Your last name should have a minimum of 3 characters');
          expect(errors).to.include('Your user name should have a minimum of 3 characters');
          expect(errors).to.include('Email format is wrong, enter valid email address');
          expect(errors).to.include('Your password should have a minimum of 6 characters');
          expect(response.body.message).to.equal('Please fix the validation errors');
          done();
        });
      });
      it('should return correct error if new user registers with an email already in use', (done) => {
        chai.request(app)
        .post('/api/v1/users/signup')
        .send(emailInUseSignUp)
        .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('The Email already exists.');
        done();
        });
      });
      it('should return correct error if new user registers with a user name already in use', (done) => {
        chai.request(app)
        .post('/api/v1/users/signup')
        .send(usernameInUseSignUp)
        .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('The Username is already in use.');
        done();
        });
      });
      it('should return correct error if new user registers with an email with a wrong format', (done) => {
        chai.request(app)
        .post('/api/v1/users/signup')
        .send(wrongEmailFormat)
        .end((error, response) => {
          const errors = response.body.errors;
          expect(response).to.have.status(400);
          expect(errors).to.include('Email format is wrong, enter valid email address');
          expect(response.body.message).to.equal('Please fix the validation errors');
          done();
        });
      });
    });
  });
    
  describe('User Sign In', () => {

    describe('Check for Authentication', () => {
      
      it('Should sign in a user if correct log in credentials are filled', (done) => {
        chai.request(app)
        .post('/api/v1/users/signin')
        .send(signinUser1)
        .end((error,response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.have.property('token');
          expect(response.body.user.email).to.equal('rachel.abaniwo@test.com');
          expect(response.body.message).to.equal('Successfully signed in.');
          done();
        });
      });
      it('should return correct error if wrong password is inputed by the user', (done) => {
        chai.request(app)
        .post('/api/v1/users/signin')
        .send(wrongPasswordSignIn)
        .end((error,response) => {
        expect(response).to.have.status(422);
        expect(response.body.message).to.equal('Wrong credentials');
        done();
        });
      });
      it('should return correct error if email address of the user signing in is not found', (done) => {
        chai.request(app)
        .post('/api/v1/users/signin')
        .send(wrongEmailSignIn)
        .end((error, response) => {
          expect(response).to.have.status(422);
          expect(response.body.message).to.equal('Wrong credentials');
          done();
        });
      });
      it('should return correct error if user does not fill all fields when signing in', (done) => {
        chai.request(app)
        .post('/api/v1/users/signin')
        .send({})
        .end((error, response) => {
          expect(response).to.have.status(400);
          const errors = response.body.errors;
          expect(errors).to.include('Email Address is required!');
          expect(errors).to.include('Password is required!');
          expect(response.body.message).to.equal('Please fix the validation errors');
          done();
        });
      });
      it('should return correct error if user fills in email address with wrong format', (done) => {
        chai.request(app)
        .post('/api/v1/users/signin')
        .send(wrongEmailFormatSignIn)
        .end((error, response) => {
          expect(response).to.have.status(400);
          const errors = response.body.errors;
          expect(errors).to.include('Email format is wrong, enter valid email address');
          expect(response.body.message).to.equal('Please fix the validation errors');
          done();
        });
      });
    });
  });
});