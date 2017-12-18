/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import data from '../mockData'

const expect = chai.expect;
let user1Token, user2Token, user3Token, user1, user2, user3;
const { signinUser1, signinUser2, signinUser3 } = data;

chai.use(chaiHttp);

describe('FAVORITE CONTROLLER', () => {
  
    describe('Delete Recipe from Favorites', () => {
  
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
      
      it('should return an error if User trying to delete a favorite recipe is not Signed in', (done) => {
        chai.request(app)
        .delete('/api/v1/favorites/2')
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body.message).to.equal('Unauthenticated USER.');
          done();
        });
      });
      it('should return an error if Favorite Recipe to be deleted is not found', (done) => {
        chai.request(app)
        .delete('/api/v1/favorites/10')
        .set('token', user2Token)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body.message).to.equal('Recipe not found');
          done();
        });
      });
      it('should return an error if the favorite recipe to be deleted isn\'t among the favorites of the Signed in User', (done) => {
        chai.request(app)
        .delete('/api/v1/favorites/1')
        .set('token', user1Token)
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body.message).to.equal('Unauthorized USER');
          done();
        });
      });
      it('should return an error if the id of the favorite id of the recipe to be deleted is not an integer', (done) => {
        chai.request(app)
        .delete('/api/v1/favorites/Rachel')
        .set('token', user2Token)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body.message).to.equal('Invalid Request');
          done();
        });
      });
      it('should delete only the favorites of a Signed in User', (done) => {
        chai.request(app)
        .delete('/api/v1/favorites/2')
        .set('token', user2Token)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.message).to.equal('Successfully deleted this recipe from your favorites');
          done();
        });
      });
    });
  });