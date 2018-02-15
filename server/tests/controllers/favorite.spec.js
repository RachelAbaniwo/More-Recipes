/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import mockData from '../mockData'

const expect = chai.expect;
let user1Token, user2Token, user3Token, user1, user2, user3;
const { signinUser1, signinUser2, signinUser3 } = mockData;

chai.use(chaiHttp);

describe('FAVORITES CONTROLLER', () => {

  before((done) => {
    chai.request(app)
    .post('/api/v1/users/signin')
    .send(signinUser1)
    .end((error, response) => {
      user1Token = response.body.token;
      user1 = response.body.user;
    });
    chai.request(app)
    .post('/api/v1/users/signin')
    .send(signinUser2)
    .end((error, response) => {
      user2Token = response.body.token;
      user2 = response.body.user;
    });
    chai.request(app)
    .post('/api/v1/users/signin')
    .send(signinUser3)
    .end((error, response) => {
      user3Token = response.body.token;
      user3 = response.body.user;
      done();
    });
  });

  describe('Add to favorite list of recipes', () => {
    
    it('should add a recipe of a signed in user\'s choice to that user\'s list of favorite recipes', (done) => {
      chai.request(app)
      .post('/api/v1/favorites/2')
      .set('token', user1Token)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.recipe.id).to.equal(2);
        expect(response.body.recipe.favorites).to.equal(1);
        expect(response.body.message).to.equal('Recipe successfully added to favorites!')
        done();
      });
    });
    it('should remove a recipe from a signed in user\'s list of favorite recipes when called twice for the same recipe', (done) => {
      chai.request(app)
      .post('/api/v1/favorites/3')
      .set('token', user2Token)
      .end((error, response) => {
        chai.request(app)
        .post('/api/v1/favorites/3')
        .set('token', user2Token)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.recipe.id).to.equal(3);
          expect(response.body.recipe.favorites).to.equal(0);
          expect(response.body.message).to.equal('Successfully removed this recipe from favorites');
          done();
        });
      });
    });
    it('should return an error if user trying to add a recipe to his/her favorites isn\'t signed in', (done) =>{
      chai.request(app)
      .post('/api/v1/favorites/3')
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthenticated')
        done();
      });
    });
    it('should return an error if a user is trying to add a recipe that doesn\'t exist to list of favorites', (done) =>{
      chai.request(app)
      .post('/api/v1/favorites/10')
      .set('token', user1Token)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('Recipe not found.')
        done();
      });
    });
    it('should return an error if user is trying to add a recipe with an ID that isn\'t an integer to list of favorites', (done) =>{
      chai.request(app)
      .post('/api/v1/favorites/Rachel')
      .set('token', user1Token)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid request.')
        done();
      });
    });
    it('should return an error if user is trying to add a personal recipe to list of favorites', (done) =>{
      chai.request(app)
      .post('/api/v1/favorites/1')
      .set('token', user1Token)
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthorized')
        done();
      });
    });
  });

  describe('Retrieve user\'s list of favorites', () => {
    
    it('should return a user\'s list of favorites', (done) =>{
      chai.request(app)
      .get('/api/v1/favorites')
      .set('token', user2Token)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.favoriteRecipes[0].name).to.equal('Fried Noodles');
        done();
      });
    });
    it('should return an error if user has no recipe in list of favorites', (done) =>{
      chai.request(app)
      .get('/api/v1/favorites')
      .set('token', user3Token)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('You have no favorite recipes')
        done();
      });
    });
    it('should return an error if user is not signed In', (done) =>{
      chai.request(app)
      .get('/api/v1/favorites')
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Unauthenticated')
        done();
      });
    });
  });
});