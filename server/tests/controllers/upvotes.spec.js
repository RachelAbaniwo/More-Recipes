/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import data from '../mockData'

const expect = chai.expect;
let user1Token, user2Token, user3Token, user1, user2, user3;
const { signinUser1, signinUser2, signinUser3, recipe1, updateRecipe } = data;

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
    
    it('should add an Upvote to a Recipe when called by a Signed in User', (done) => {
      chai.request(app)
      .post('/api/v1/recipes/5/upvote')
      .set('token', user1Token)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.message).to.equal('Recipe Upvoted successfully')
        done();
      });
    });
    it('should add an Upvote to a Recipe and Remove Downvote if Recipe was previously Downvoted', (done) => {
      chai.request(app)
      .post('/api/v1/recipes/2/upvote')
      .set('token', user1Token)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.message).to.equal('Recipe Upvoted successfully')
        done();
      });
    });
    it('should remove an Upvote from a Recipe when called twice for the same Recipe by the same User', (done) => {
      chai.request(app)
      .post('/api/v1/recipes/6/upvote')
      .set('token', user2Token)
      .end((error, response) => {
        chai.request(app)
        .post('/api/v1/recipes/6/upvote')
        .set('token', user2Token)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.message).to.equal('Successfully removed Upvote from this recipe')
          done();
        });
      });
    });
    it('should return an error if User trying to add an upvote isn\'t Signed In', (done) =>{
      chai.request(app)
      .post('/api/v1/recipes/6/upvote')
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthenticated USER.')
        done();
      });
    });
    it('should return an error if User is trying to add an upvote to a recipe that doesn\'t exist', (done) =>{
      chai.request(app)
      .post('/api/v1/recipes/10/upvote')
      .set('token', user1Token)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('Recipe not found.')
        done();
      });
    });
    it('should return an error if User is trying to Upvote a recipe with an ID that isn\'t an integer', (done) =>{
      chai.request(app)
      .post('/api/v1/recipes/Rachel/upvote')
      .set('token', user1Token)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid Request.')
        done();
      });
    });
    it('should return an error if User is trying to add an Upvote to a Personal recipe', (done) =>{
      chai.request(app)
      .post('/api/v1/recipes/1/upvote')
      .set('token', user1Token)
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthorized.')
        done();
      });
    });
  });
});