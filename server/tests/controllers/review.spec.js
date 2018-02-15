/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import mockData from '../mockData'

const expect = chai.expect;
let user1Token, user2Token, user3Token, user1, user2, user3;
const { signinUser1, signinUser2, signinUser3, review1 } = mockData;

chai.use(chaiHttp);

describe('REVIEW CONTROLLER', () => {

  describe('Add Reviews', () => {

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
    
    it('should add a review to the recipe with Id is specified by a signed in user', (done) => {
       chai.request(app)
      .post('/api/v1/reviews/1')
      .set('token', user1Token)
      .send(review1)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.review.review).to.equal('Awesome Stuff');
        expect(response.body.message).to.equal('Review successfully added!');
        done();
      });
    });
    it('should return an error if User adding a review is not signed in', (done) => {
      chai.request(app)
      .post('/api/v1/reviews/1')
      .send(review1)
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthenticated');
        done();
      });
    });
    it('should return an error if the Id of the recipe to be reviewed does not exist', (done) => {
      chai.request(app)
      .post('/api/v1/reviews/10')
      .set('token', user1Token)
      .send(review1)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('Recipe to be reviewed not found');
        done();
      });
    });
    it('should return an error if the Id of the recipe to be reviewed is not an integer', (done) => {
      chai.request(app)
      .post('/api/v1/reviews/review')
      .set('token', user1Token)
      .send(review1)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid request');
        done();
      });
    });
    it('should return an error if the review field is empty', (done) => {
      chai.request(app)
      .post('/api/v1/reviews/1')
      .set('token', user2Token)
      .send({})
       .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Review field empty');
        done();
      });
    });
  });

  describe('Get Recipe Reviews', () => {
    
    it('it should get all the reviews of a recipe', (done) => {
      chai.request(app)
      .get('/api/v1/reviews/1')
       .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.reviews[0].recipeId).to.equal(1);
        done();
      });
    });
    it('it should return an error if recipe doesn\'t exist', (done) => {
      chai.request(app)
      .get('/api/v1/reviews/10')
       .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Recipe not found');
        done();
      });
    });
    it('it should return an error if recipe doesn\'t exist', (done) => {
      chai.request(app)
      .get('/api/v1/reviews/2')
       .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Recipe has no reviews');
        done();
      });
    });
  });
});