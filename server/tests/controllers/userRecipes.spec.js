/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import mockData from '../mockData'

const expect = chai.expect;
let user1Token, user2Token, user3Token, user1, user2, user3;

const { signinUser1, signinUser2, signinUser3, wrongUsernameSignIn, 
       wrongPasswordSignIn, signupUser, emailInUseSignUp,
       usernameInUseSignUp, wrongEmailFormat } = mockData;

chai.use(chaiHttp);

describe('USER CONTROLLER', () => {

  describe('Retrieve User Recipes', () => {
  
    before((done) => {
      chai.request(app)
      .post('/api/v1/users/signin')
      .send(signinUser1)
      .end((error,response) => {
        user1Token = response.body.token;
        user1 = response.body.user;
      });
      chai.request(app)
      .post('/api/v1/users/signin')
      .send(signinUser3)
      .end((error,response) => {
        user3Token = response.body.token;
        user3 = response.body.user;
      });
      chai.request(app)
      .post('/api/v1/users/signin')
      .send(signinUser2)
      .end((error,response) => {
        user2Token = response.body.token;
        user2 = response.body.user;
        done();
      });
    });
  
    it('should return all recipes created by a user when called by that user', (done) => {
      chai.request(app)
      .get('/api/v1/users/myrecipes')
      .set('token', user1Token)
      .end((error, response) => {
        console.log(error);
        expect(response).to.have.status(200);
        expect(response.body.myRecipes[0].name).to.equal('Fried Noodles');
        expect(response.body.myRecipes[0].userId).to.equal(user1.id);
        done();
      });
    });
    it('should return an error if user is not signed in', (done) => {
      chai.request(app)
      .get('/api/v1/users/myrecipes')
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Unauthenticated');
        done();
      });
    });
    it('should return an error if signed in user has no recipes', (done) => {
      chai.request(app)
      .get('/api/v1/users/myrecipes')
      .set('token', user3Token)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('You have no recipes')
        done();
      });
    });
    it('should return all recipes created by a user when requested by another signed in user', (done) => {
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
        expect(response.body.message).to.equal('Unauthenticated');
        done();
      });
    });
    it('should return an error if the id of the user requested does not exist', (done) => {
      chai.request(app)
      .get('/api/v1/users/10/recipes')
      .set('token', user1Token)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('User not found');
        done();
      });
    });
    it('should return an error if the user being requested has no recipes', (done) => {
      chai.request(app)
      .get('/api/v1/users/3/recipes')
      .set('token', user1Token)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('User has no recipes');
        done();
      });
    });
    it('should return an error if the id of the user requested is not an integer', (done) => {
      chai.request(app)
      .get('/api/v1/users/Rachel/recipes')
      .set('token', user1Token)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Invalid request');
        done();
      });
    });
  });
});