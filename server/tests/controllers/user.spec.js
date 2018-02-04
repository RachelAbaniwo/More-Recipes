/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import data from '../mockData'

const expect = chai.expect;
let user1Token, user2Token, user3Token, user1, user2, user3;

const { signinUser1, signinUser2, signinUser3, wrongCharacterSignUp, wrongEmailSignIn, 
       wrongPasswordSignIn, signupUser, emailInUseSignUp,
       usernameInUseSignUp, wrongEmailFormat } = data;

chai.use(chaiHttp);

describe('USER CONTROLLER', () => {
  
  describe('User Sign up', () => {

    describe('Check for Validation', () => {
    
      it('should Register a New User if all fields are filled appropriately with unique details', (done) => {
        chai.request(app)
        .post('/api/v1/users/signup')
        .send(signupUser)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.have.property('token');
          expect(response.body).to.have.property('user');
          expect(response.body.message).to.equal('Successfully signed up!');
          done();
        });
      });
      it('should return correct validation error if New User doesn\'t fill all specified fields', (done) => {
        chai.request(app)
        .post('/api/v1/users/signup')
        .send({})
        .end((error, response) => {
          expect(response).to.have.status(400);
          const errors = response.body.errors;
          expect(errors).to.include('First name is Required!');
          expect(errors).to.include('Last name is Required!');
          expect(errors).to.include('Choose your User Name.');
          expect(errors).to.include('Email Address is Required!');
          expect(errors).to.include('Choose a Password');

          expect(response.body.message).to.equal('Please fix the validation errors');
          done();
        });
      });
      it('should return correct validation errors if New User fills in invalid characters and wrong number of characters', (done) => {
        chai.request(app)
        .post('/api/v1/users/signup')
        .send({wrongCharacterSignUp})
        .end((error, response) => {
          expect(response).to.have.status(400);
          const errors = response.body.errors;
          expect(errors).to.include('First name is Required!');
          expect(errors).to.include('Last name is Required!');
          expect(errors).to.include('Choose your User Name.');
          expect(errors).to.include('Email Address is Required!');
          expect(errors).to.include('Choose a Password');

          expect(response.body.message).to.equal('Please fix the validation errors');
          done();
        });
      });
      it('should return correct error if New User Registers with an Email already in use', (done) => {
        chai.request(app)
        .post('/api/v1/users/signup')
        .send(emailInUseSignUp)
        .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('The Email already exists.');
        done();
        });
      });
      it('should return correct error if New User Registers with a User name already in use', (done) => {
        chai.request(app)
        .post('/api/v1/users/signup')
        .send(usernameInUseSignUp)
        .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('The Username is already in use.');
        done();
        });
      });
      it('should return correct error if New User Registers with an Email with a wrong format', (done) => {
        chai.request(app)
        .post('/api/v1/users/signup')
        .send(wrongEmailFormat)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body.message).to.equal('Validation error: The Email entered is invalid');
          done();
        });
      });
    });
  });
    
  describe('User Sign In', () => {

    describe('Check for Authentication', () => {
      
      it('Should Sign In a User if correct Log in credentials are filled', (done) => {
        chai.request(app)
        .post('/api/v1/users/signin')
        .send(signinUser1)
        .end((error,response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.have.property('token');
          expect(response.body.message).to.equal('Successfully signed in.');
          done();
        });
      });
      it('should return correct error if wrong Password is inputed by the User', (done) => {
        chai.request(app)
        .post('/api/v1/users/signin')
        .send(wrongPasswordSignIn)
        .end((error,response) => {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('Wrong credentials');
        done();
        });
      });
      it('should return correct error if User name of the User Signing In is not found', (done) => {
        chai.request(app)
        .post('/api/v1/users/signin')
        .send(wrongEmailSignIn)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body.message).to.equal('Wrong credentials');
          done();
        });
      });
      it('should return correct error if User does not fill all fields when Signing in', (done) => {
        chai.request(app)
        .post('/api/v1/users/signin')
        .send({})
        .end((error, response) => {
          expect(response).to.have.status(400);
          const errors = response.body.errors;
          expect(errors).to.include('Username is required! ');
          expect(errors).to.include('Password is required!');
          expect(response.body.message).to.equal('Please fix the validation errors');
          done();
        });
      });
    });
  });
});

