/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import data from '../mockData'

const expect = chai.expect;
let user1Token, user2Token, user3Token, user1, user2, user3;
const { signinUser1, signinUser2, signinUser3, recipe1, updateRecipe } = data;

chai.use(chaiHttp);

describe('DOWNVOTES CONTROLLER', () => {
 
  describe('Add Downvote', () => {

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
    
    it('should add a Downvote to a Recipe when called by a Signed in User', (done) => {
      chai.request(app)
      .post('/api/v1/recipes/4/downvote')
      .set('token', user2Token)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.message).to.equal('Recipe Downvoted successfully')
        done();
      });
    });
    it('should add a Downvote to a Recipe and Remove Upvote if Recipe was previously Upvoted', (done) => {
      chai.request(app)
      .post('/api/v1/recipes/1/downvote')
      .set('token', user2Token)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.message).to.equal('Recipe Downvoted successfully')
        done();
      });
    });
    it('should remove a downvote from a Recipe when called twice for the same Recipe by the same User', (done) => {
      chai.request(app)
      .post('/api/v1/recipes/6/downvote')
      .set('token', user2Token)
      .end((error, response) => {
        chai.request(app)
        .post('/api/v1/recipes/6/downvote')
        .set('token', user2Token)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.message).to.equal('Successfully removed Downvote from this recipe')
          done();
        });
      });
    });
    it('should return an error if User trying to add a downvote isn\'t Signed In', (done) =>{
      chai.request(app)
      .post('/api/v1/recipes/4/downvote')
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthenticated USER.')
        done();
      });
    });
    it('should return an error if User is trying to add a downvote to a recipe that doesn\'t exist', (done) =>{
      chai.request(app)
      .post('/api/v1/recipes/10/downvote')
      .set('token', user1Token)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('Recipe not found.')
        done();
      });
    });
    it('should return an error if User is trying to downvote a recipe with an ID that isn\'t an integer', (done) =>{
      chai.request(app)
      .post('/api/v1/recipes/Rachel/downvote')
      .set('token', user1Token)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid Request.')
        done();
      });
    });
    it('should return an error if User is trying to add a Downvote to a Personal recipe', (done) =>{
      chai.request(app)
      .post('/api/v1/recipes/1/downvote')
      .set('token', user1Token)
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthorized.')
        done();
      });
    });
  });
});
