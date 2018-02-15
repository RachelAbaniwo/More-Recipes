/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import mockData from '../mockData'

const expect = chai.expect;
let user1Token, user2Token, user3Token, user1, user2, user3;
const { signinUser1, signinUser2, signinUser3, recipe1, updateRecipe } = mockData;

chai.use(chaiHttp);

describe('UPVOTES CONTROLLER', () => {
 
  describe('Add Upvote', () => {

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
    
    it('should add an Upvote to a Recipe when called by a signed in user', (done) => {
      chai.request(app)
      .post('/api/v1/recipes/5/upvote')
      .set('token', user1Token)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.recipe.id).to.equal(5);
        expect(response.body.recipe.upvotes).to.equal(1);
        expect(response.body.message).to.equal('Recipe upvoted successfully')
        done();
      });
    });
    it('should add an upvote to a recipe and remove downvote if recipe was previously downvoted', (done) => {
      chai.request(app)
      .post('/api/v1/recipes/2/upvote')
      .set('token', user1Token)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.recipe.id).to.equal(2);
        expect(response.body.recipe.downvotes).to.equal(0);
        expect(response.body.recipe.upvotes).to.equal(1);
        expect(response.body.message).to.equal('Recipe upvoted successfully')
        done();
      });
    });
    it('should remove an upvote from a recipe when called twice for the same recipe by the same user', (done) => {
      chai.request(app)
      .post('/api/v1/recipes/6/upvote')
      .set('token', user2Token)
      .end((error, response) => {
        chai.request(app)
        .post('/api/v1/recipes/6/upvote')
        .set('token', user2Token)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.recipe.id).to.equal(6);
          expect(response.body.recipe.upvotes).to.equal(0);
          expect(response.body.message).to.equal('Successfully removed upvote from this recipe')
          done();
        });
      });
    });
    it('should return an error if user trying to add an upvote isn\'t signed In', (done) =>{
      chai.request(app)
      .post('/api/v1/recipes/6/upvote')
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthenticated')
        done();
      });
    });
    it('should return an error if user is trying to add an upvote to a recipe that doesn\'t exist', (done) =>{
      chai.request(app)
      .post('/api/v1/recipes/10/upvote')
      .set('token', user1Token)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('Recipe not found.')
        done();
      });
    });
    it('should return an error if user is trying to upvote a recipe with an ID that isn\'t an integer', (done) =>{
      chai.request(app)
      .post('/api/v1/recipes/Rachel/upvote')
      .set('token', user1Token)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid request.')
        done();
      });
    });
    it('should return an error if User is trying to add an upvote to a personal recipe', (done) =>{
      chai.request(app)
      .post('/api/v1/recipes/1/upvote')
      .set('token', user1Token)
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthorized')
        done();
      });
    });
  });
});