/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../../models/index'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import app from '../../app';
import data from '../mockData'

const expect = chai.expect;
let user1Token, user2Token, user3Token, user1, user2, user3;

const { signinUser1, signinUser2, signinUser3, wrongUsernameSignIn, 
       wrongPasswordSignIn, signupUser, emailInUseSignUp,
       usernameInUseSignUp, wrongEmailFormat } = data;

chai.use(chaiHttp);

describe('UNKNOWN ROUTES', () => {
  it('should return an error when called', (done) => {
    chai.request(app)
    .get('/api/v1/users/favorite')
    .end((error, response) => {
      
      expect(response.body).to.equal('UNKNOWN REQUEST.');
      done();
    });
  });
});

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
          expect(response.body).to.have.property('createdUser');
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
        .send(wrongUsernameSignIn)
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
          expect(errors).to.include('Username is required');
          expect(errors).to.include('Password is required');
          expect(response.body.message).to.equal('Please fix the validation errors');
          done();
        });
      });
    });
  });

  describe('Retrieve User Recipes', () => {

    before((done) => {
      chai.request(app)
      .post('/api/v1/users/signin')
      .send(signinUser1)
      .end((error,response) => {
        user1Token = response.body.token;
        user1 = response.body.existingUser;
      });
      chai.request(app)
      .post('/api/v1/users/signin')
      .send(signinUser3)
      .end((error,response) => {
        user3Token = response.body.token;
        user3 = response.body.existingUser;
      });
      chai.request(app)
      .post('/api/v1/users/signin')
      .send(signinUser2)
      .end((error,response) => {
        user2Token = response.body.token;
        user2 = response.body.existingUser;
        done();
      });
    });

    it('should return all recipes created by a User when called by that User', (done) => {
      chai.request(app)
      .get('/api/v1/users/myrecipes')
      .set('token', user1Token)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.recipes[0].name).to.equal('Fried Noodles');
        expect(response.body.recipes[0].userId).to.equal(user1.id);
        done();
      });
    });
    it('should return an error if User is not Signed In', (done) => {
      chai.request(app)
      .get('/api/v1/users/myrecipes')
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Unauthenticated USER.');
        done();
      });
    });
    it('should return an error if Signed in User has no Recipes', (done) => {
      chai.request(app)
      .get('/api/v1/users/myrecipes')
      .set('token', user3Token)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('You have no Recipes')
        done();
      });
    });
    it('should return all recipes created by a User when requested by another Signed in User', (done) => {
      chai.request(app)
      .get('/api/v1/users/1/recipes')
      .set('token', user3Token)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.recipes[0].name).to.equal('Fried Noodles');
        expect(response.body.recipes[0].userId).to.equal(user1.id);
        done();
      });
    });
    it('should return an error if the user calling the route isn\'t signed in', (done) => {
      chai.request(app)
      .get('/api/v1/users/1/recipes')
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Unauthenticated USER.');
        done();
      });
    });
    it('should return an error if the id of the User requested does not exist', (done) => {
      chai.request(app)
      .get('/api/v1/users/10/recipes')
      .set('token', user1Token)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('User not Found');
        done();
      });
    });
    it('should return an error if the User being requested has no Recipes', (done) => {
      chai.request(app)
      .get('/api/v1/users/3/recipes')
      .set('token', user1Token)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('User has no Recipes');
        done();
      });
    });
    it('should return an error if the id of the User requested is not an Integer', (done) => {
      chai.request(app)
      .get('/api/v1/users/Rachel/recipes')
      .set('token', user1Token)
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Invalid Request');
        done();
      });
    });
  });
});

