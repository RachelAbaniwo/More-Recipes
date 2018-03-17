/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import mockData from '../mockData'

const expect = chai.expect;
let rachelToken, ineneToken, nelsonToken;
const { rachel, inene, nelson, ofada, chickenChilli } = mockData;

chai.use(chaiHttp);

describe('DOWNVOTES CONTROLLER', () => {
 describe('Add Downvote', () => {
   before((done) => {
      chai.request(app)
      .post('/api/v1/users/signin')
      .send(rachel)
      .end((error, response) => {
        rachelToken = response.body.token;
      });
      chai.request(app)
      .post('/api/v1/users/signin')
      .send(inene)
      .end((error, response) => {
        ineneToken = response.body.token;
      });
      chai.request(app)
      .post('/api/v1/users/signin')
      .send(nelson)
      .end((error, response) => {
        nelsonToken = response.body.token;
        done();
      });
    });
    
    it('should add a downvote to a recipe when called by a signed in user', (done) => {
      chai.request(app)
      .post('/api/v1/recipes/4/downvote')
      .set('token', ineneToken)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.recipe.id).to.equal(4);
        expect(response.body.recipe.downvotes).to.equal(1);
        expect(response.body.message).to.equal('Recipe downvoted successfully')
        done();
      });
    });
    it('should add a downvote to a recipe and remove upvote if recipe was previously upvoted', (done) => {
      chai.request(app)
      .post('/api/v1/recipes/1/downvote')
      .set('token', ineneToken)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.recipe.id).to.equal(1);
        expect(response.body.recipe.upvotes).to.equal(0);
        expect(response.body.recipe.downvotes).to.equal(1);
        expect(response.body.message).to.equal('Recipe downvoted successfully')
        done();
      });
    });
    it('should remove a downvote from a recipe when called twice for the same recipe by the same user', (done) => {
      chai.request(app)
      .post('/api/v1/recipes/6/downvote')
      .set('token', ineneToken)
      .end((error, response) => {
        chai.request(app)
        .post('/api/v1/recipes/6/downvote')
        .set('token', ineneToken)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.recipe.id).to.equal(6);
          expect(response.body.recipe.downvotes).to.equal(0);
          expect(response.body.message).to.equal('Successfully removed downvote from this recipe')
          done();
        });
      });
    });
    it('should return an error if user trying to add a downvote isn\'t signed in', (done) =>{
      chai.request(app)
      .post('/api/v1/recipes/4/downvote')
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthenticated')
        done();
      });
    });
    it('should return an error if user is trying to add a downvote to a recipe that doesn\'t exist', (done) =>{
      chai.request(app)
      .post('/api/v1/recipes/10/downvote')
      .set('token', rachelToken)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('Recipe not found.')
        done();
      });
    });
    it('should return an error if User is trying to downvote a recipe with an ID that isn\'t an integer', (done) =>{
      chai.request(app)
      .post('/api/v1/recipes/Rachel/downvote')
      .set('token', rachelToken)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid request.')
        done();
      });
    });
    it('should return an error if User is trying to add a downvote to a personal recipe', (done) =>{
      chai.request(app)
      .post('/api/v1/recipes/1/downvote')
      .set('token', rachelToken)
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthorized')
        done();
      });
    });
  });
});
