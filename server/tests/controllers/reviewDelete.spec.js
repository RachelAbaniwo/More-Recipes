/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import mockData from '../mockData';
import db from '../../models';

const { Review } = db;
const expect = chai.expect;
let user1Token, user2Token, user3Token, user1, user2, user3;

const { signinUser1, signinUser2, signinUser3, review1, review2 } = mockData;

chai.use(chaiHttp);



describe('REVIEW CONTROLLER', () => {

  describe('Delete Review', () => {

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
    
    it('should return an error if User trying to delete a review is not signed in', (done) => {
      chai.request(app)
      .delete('/api/v1/reviews/3')
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthenticated');
        done();
      });
    });
    it('should return an error if Review to be deleted is not found', (done) => {
      chai.request(app)
      .delete('/api/v1/reviews/10')
      .set('token', user2Token)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('Review not found');
        done();
      });
    });
    it('should return an error if the review to be deleted is not a review made by the signed in user', (done) => {
      chai.request(app)
      .delete('/api/v1/reviews/1')
      .set('token', user2Token)
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthorized');
        done();
      });
    });
    it('should return an error if the review id of the recipe to be deleted is not an integer', (done) => {
      chai.request(app)
      .delete('/api/v1/reviews/Rachel')
      .set('token', user3Token)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid request');
        done();
      });
    });
    it('should delete only reviews created by a signed in user', (done) => {
      chai.request(app)
      .delete('/api/v1/reviews/2')
      .set('token', user2Token)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.message).to.equal('Successfully deleted your review');
        Review.findById(2).then(recipe => {
          expect(recipe).to.be.null;
          done();
        });
      });
    });
  });
});