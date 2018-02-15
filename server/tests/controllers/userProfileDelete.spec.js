/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import mockData from '../mockData'

const expect = chai.expect;
let user1Token, user5Token, user1, user5;

const { signinUser1, signinUser5 } = mockData;

chai.use(chaiHttp);

describe('DELETE USER CONTROLLER', () => {

  describe('Delete User', () => {

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
      .send(signinUser5)
      .end((error, response) => {
        user5Token = response.body.token;
        user5 = response.body.existingUser;
        done();
      });
    });

    it('should return an error if user is not signed in', (done) => {
      chai.request(app)
      .delete('/api/v1/users/5')
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthenticated');
        done();
      });
    });
    it('should return an error if user profile is to be deleted by another user', (done) => {
      chai.request(app)
      .delete('/api/v1/users/5')
      .set('token', user1Token)
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthorized');
        done();
      });
    });
    it('should return an error if user to be deleted is not found', (done) => {
      chai.request(app)
      .delete('/api/v1/users/10')
      .set('token', user1Token)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('User not found');
        done();
      });
    });
    it('should return an error if the user ID of user to be deleted specified is not an integer', (done) => {
      chai.request(app)
      .delete('/api/v1/users/Rachel')
      .set('token', user1Token)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid request');
        done();
      });
    });
    it('should delete the profile of a signed in user', (done) => {
      chai.request(app)
      .delete('/api/v1/users/5')
      .set('token', user5Token)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.message).to.equal('Successfully deleted user');
        done();
      });
    })
  });
});