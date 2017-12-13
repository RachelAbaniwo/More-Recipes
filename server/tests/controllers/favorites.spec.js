/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import data from '../mockData'

const expect = chai.expect;
let user1Token, user2Token, user3Token, user1, user2, user3;
const { signinUser1, signinUser2, signinUser3, recipe1, updateRecipe } = data;

chai.use(chaiHttp);

describe('FAVORITES CONTROLLER', () => {

  before((done) => {
    chai.request(app)
    .post('/api/v1/users/signin')
    .send(signinUser1)
    .end((error, response) => {
      user1Token = response.body.token;
      user1 = response.body.existingUser;
    });
    chai.request(app)
    .post('/api/v1/users/signin')
    .send(signinUser2)
    .end((error, response) => {
      user2Token = response.body.token;
      user2 = response.body.existingUser;
    });
    chai.request(app)
    .post('/api/v1/users/signin')
    .send(signinUser3)
    .end((error, response) => {
      user3Token = response.body.token;
      user3 = response.body.existingUser;
      done();
    });
  });

  describe('Add to Favorite List of Recipes', () => {
    
    it('should add a Recipe of a Signed In User\'s choice to that User\'s List of Favorite Recipes', (done) => {
      chai.request(app)
      .post('/api/v1/users/favorites/2')
      .set('token', user1Token)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.message).to.equal('Recipe successfully added to Favorites!')
        done();
      });
    });
    it('should remove a Recipe from a Signed In User\'s List of Favorite Recipes when called twice for the same Recipe', (done) => {
      chai.request(app)
      .post('/api/v1/users/favorites/3')
      .set('token', user2Token)
      .end((error, response) => {
        chai.request(app)
        .post('/api/v1/users/favorites/3')
        .set('token', user2Token)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.message).to.equal('Successfully removed this recipe from Favorites');
          done();
        });
      });
    });
    it('should return an error if User trying to add a recipe to his/her Favorites isn\'t signed in', (done) =>{
      chai.request(app)
      .post('/api/v1/users/favorites/3')
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthenticated USER.')
        done();
      });
    });
    it('should return an error if a User is trying to add a recipe that doesn\'t exist to List of Favorites', (done) =>{
      chai.request(app)
      .post('/api/v1/users/favorites/10')
      .set('token', user1Token)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('Recipe not found.')
        done();
      });
    });
    it('should return an error if User is trying to add a recipe with an ID that isn\'t an integer to List of Favorites', (done) =>{
      chai.request(app)
      .post('/api/v1/users/favorites/Rachel')
      .set('token', user1Token)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid Request.')
        done();
      });
    });
    it('should return an error if User is trying to add a Personal recipe to List of Favorites', (done) =>{
      chai.request(app)
      .post('/api/v1/users/favorites/1')
      .set('token', user1Token)
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthorized.')
        done();
      });
    });
  });

  describe('Retrieve User\'s List of Favorites', () => {
    
    it('should return a User\'s List of Favorites', (done) =>{
      chai.request(app)
      .get('/api/v1/users/favorites')
      .set('token', user2Token)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.recipes[0].userId).to.equal(user1.id);
        done();
      });
    });
    it('should return an Error if User has no Recipe in List of Favorites', (done) =>{
      chai.request(app)
      .get('/api/v1/users/favorites')
      .set('token', user3Token)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('You have no Favorite Recipes')
        done();
      });
    });
    it('should return an Error if User is not Signed In', (done) =>{
      chai.request(app)
      .get('/api/v1/users/favorites')
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Unauthenticated USER.')
        done();
      });
    });
  });
});