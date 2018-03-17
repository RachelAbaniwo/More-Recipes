/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import mockData from '../mockData';
import db from '../../models';

const { User } = db;
const expect = chai.expect;
let rachelToken, nnenaToken;

const { rachel, nnena } = mockData;

chai.use(chaiHttp);

describe('DELETE USER CONTROLLER', () => {
  describe('Delete User', () => {
    before((done) => {
      chai.request(app)
      .post('/api/v1/users/signin')
      .send(rachel)
      .end((error, response) => {
        rachelToken = response.body.token;
      });
      chai.request(app)
      .post('/api/v1/users/signin')
      .send(nnena)
      .end((error, response) => {
        nnenaToken = response.body.token;
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
      .set('token', rachelToken)
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthorized');
        done();
      });
    });
    it('should return an error if user to be deleted is not found', (done) => {
      chai.request(app)
      .delete('/api/v1/users/10')
      .set('token', rachelToken)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('User not found');
        done();
      });
    });
    it('should return an error if the user ID of user to be deleted specified is not an integer', (done) => {
      chai.request(app)
      .delete('/api/v1/users/Rachel')
      .set('token', rachelToken)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid request');
        done();
      });
    });
    it('should delete the profile of a signed in user', (done) => {
      chai.request(app)
      .delete('/api/v1/users/5')
      .set('token', nnenaToken)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.message).to.equal('Successfully deleted user');
        User.findById(5).then(user => {
          expect(user).to.be.null;
          done();
        });
      });
    })
  });
});
