/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import mockData from '../mockData'

const expect = chai.expect;
let rachelToken, ineneToken, nelsonToken;
const { rachel, inene, nelson, review } = mockData;

chai.use(chaiHttp);

describe('REVIEW CONTROLLER', () => {
  describe('Add Reviews', () => {
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
    
    it('should add a review to the recipe with Id specified by a signed in user', (done) => {
       chai.request(app)
      .post('/api/v1/recipes/1/reviews')
      .set('token', rachelToken)
      .send(review)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.review.recipeId).to.equal(1);
        expect(response.body.message).to.equal('Review successfully added!');
        done();
      });
    });
    it('should return an error if user adding a review is not signed in', (done) => {
      chai.request(app)
      .post('/api/v1/recipes/1/reviews')
      .send(review)
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthenticated');
        done();
      });
    });
    it('should return an error if the Id of the recipe to be reviewed does not exist', (done) => {
      chai.request(app)
      .post('/api/v1/recipes/10/reviews')
      .set('token', rachelToken)
      .send(review)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('Recipe to be reviewed not found');
        done();
      });
    });
    it('should return an error if the Id of the recipe to be reviewed is not an integer', (done) => {
      chai.request(app)
      .post('/api/v1/recipes/NOT_AN_INTEGER/reviews')
      .set('token', rachelToken)
      .send(review)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid request');
        done();
      });
    });
    it('should return an error if the review field is empty', (done) => {
      chai.request(app)
      .post('/api/v1/recipes/1/reviews')
      .set('token', ineneToken)
      .send({})
       .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Review field empty');
        done();
      });
    });
  });

  describe('Get Recipe Reviews', () => {
    it('it should get all the reviews of a recipe when called by authenticated users', (done) => {
      chai.request(app)
      .get('/api/v1/recipes/1/reviews')
      .set('token', ineneToken)
       .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.reviews[0].recipeId).to.equal(1);
        done();
      });
    });
    it('it should get all the reviews of a recipe when called by unauthenticated users', (done) => {
      chai.request(app)
      .get('/api/v1/recipes/1/reviews')
       .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.reviews[0].recipeId).to.equal(1);
        done();
      });
    });
    it('it should return an error if recipe doesn\'t exist', (done) => {
      chai.request(app)
      .get('/api/v1/recipes/10/reviews')
       .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Recipe not found');
        done();
      });
    });
    it('it should return an error if recipe reviews are not available', (done) => {
      chai.request(app)
      .get('/api/v1/recipes/2/reviews')
       .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Recipe has no reviews');
        done();
      });
    });
  });
});
