/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import mockData from '../mockData'

const expect = chai.expect;
let user1Token, user4Token, user5Token, user1, user4, user5;

const { signinUser1, signinUser4, signinUser5, updateUser1, wrongUpdateUser} = mockData;

chai.use(chaiHttp);

describe('MODIFY USER CONTROLLER', () => {

  describe('Update User', () => {

    before((done) => {
      chai.request(app)
      .post('/api/v1/users/signin')
      .send(signinUser1)
      .end((error, response) => {
        user1Token = response.body.token;
        user1 = response.body.user;
      });
      chai.request(app)
      .post('/api/v1/users/signin')
      .send(signinUser4)
      .end((error, response) => {
        user4Token = response.body.token;
        user4 = response.body.user;
      });
      chai.request(app)
      .post('/api/v1/users/signin')
      .send(signinUser5)
      .end((error, response) => {
        user5Token = response.body.token;
        user5 = response.body.user;
        done();
      });
    });

    it('should return an error if user is not signed in', (done) => {
      chai.request(app)
      .put('/api/v1/users/4')
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthenticated');
        done();
      });
    });
    it('should return an error if user profile is updated by another user', (done) => {
      chai.request(app)
      .put('/api/v1/users/4')
      .set('token', user1Token)
      .send(updateUser1)
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthorized');
        done();
      });
    });
    it('should return an error if user to be updated is not found', (done) => {
      chai.request(app)
      .put('/api/v1/users/10')
      .set('token', user1Token)
      .send(updateUser1)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('User not found');
        done();
      });
    });
    it('should return an error if the user ID of user to be updated specified is not an integer', (done) => {
      chai.request(app)
      .put('/api/v1/users/Rachel')
      .set('token', user1Token)
      .send(updateUser1)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid request');
        done();
      });
    });
    it('should update the profile of a signed in user', (done) => {
      chai.request(app)
      .put('/api/v1/users/4')
      .set('token', user4Token)
      .send(updateUser1)
      .end((error, response) => {
        expect(response).to.have.status(201);
        const user = response.body.user;
        expect(user.id).to.equal(4);
        expect(user.firstname).to.equal('Rach');
        expect(response.body.message).to.equal('Successfully updated profile');
        done();
      });
    })
    it('should retain previous details of the user if fields are empty or if invalid characters are filled into update fields', (done) => {
      chai.request(app)
      .put('/api/v1/users/1')
      .set('token', user1Token)
      .send(wrongUpdateUser)
      .end((error, response) => {
        expect(response).to.have.status(201);
        const user = response.body.user;
        expect(user.id).to.equal(1);
        expect(user.firstname).to.equal('Rachel');
        expect(response.body.message).to.equal('Successfully updated profile');
        done();
      });
    });
  });
});