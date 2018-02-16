/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import mockData from '../mockData'

const expect = chai.expect;
let user1Token, user2Token, user3Token, user1, user2, user3;

const { signinUser1, signinUser2, signinUser3, review1, review2 } = mockData;

chai.use(chaiHttp);

describe('REVIEW CONTROLLER', () => {

  describe('Update Review', () => {

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
    
    it('should return an error if User trying to update a review is not Signed in', (done) => {
      chai.request(app)
      .put('/api/v1/reviews/1')
      .send(review2)
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthenticated');
        done();
      });
    });
    it('should return an error if Review to be updated is not found', (done) => {
      chai.request(app)
      .put('/api/v1/reviews/10')
      .set('token', user2Token)
      .send(review2)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('Review not found');
        done();
      });
    });
    it('should return an error if the review to be updated is not a review made by the signed in user', (done) => {
      chai.request(app)
      .put('/api/v1/reviews/1')
      .set('token', user2Token)
      .send(review2)
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthorized');
        done();
      });
    });
    it('should return an error if the review id of the recipe to be updated is not an integer', (done) => {
      chai.request(app)
      .put('/api/v1/reviews/Rachel')
      .set('token', user3Token)
      .send(review2)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid request');
        done();
      });
    });
    it('should retain previous review if field is empty or if empty spaces are filled into update field', (done) => {
      chai.request(app)
      .put('/api/v1/reviews/1')
      .set('token', user1Token)
      .send({ review: '  ' })
      .end((error, response) => {
        expect(response).to.have.status(201);
        const review = response.body.review;
        expect(review.id).to.equal(1);
        expect(review.review).to.equal('This is Awesome');
        expect(response.body.message).to.equal('Successfully updated your review');
        done();
      });
    });
    it('should update only reviews created by a signed in user', (done) => {
      chai.request(app)
      .put('/api/v1/reviews/1')
      .set('token', user1Token)
      .send(review2)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.review.review).to.equal('Nice!');
        expect(response.body.message).to.equal('Successfully updated your review');
        done();
      });
    });
  });
});