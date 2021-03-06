/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import mockData from '../mockData';
import db from '../../models';

const { Favorite } = db;
const expect = chai.expect;
let rachelToken, ineneToken, nelsonToken, neneToken;
const { rachel, inene, nelson, nene  } = mockData;

chai.use(chaiHttp);

describe('FAVORITE CONTROLLER', () => {
   describe('Delete recipe from favorites', () => {
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
        });
        chai.request(app)
        .post('/api/v1/users/signin')
        .send(nene)
        .end((error, response) => {
          neneToken = response.body.token;
          done();
        });
      });
    
      it('should return an error if user trying to delete a favorite recipe is not signed in', (done) => {
        chai.request(app)
        .delete('/api/v1/favorites/2')
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body.message).to.equal('Unauthenticated');
          done();
        });
      });
      it('should return an error if favorite recipe to be deleted is not found', (done) => {
        chai.request(app)
        .delete('/api/v1/favorites/10')
        .set('token', ineneToken)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body.message).to.equal('Recipe not found');
          done();
        });
      });
      it('should return an error if the favorite recipe to be deleted isn\'t among the favorites of the signed in user', (done) => {
        chai.request(app)
        .delete('/api/v1/favorites/1')
        .set('token', rachelToken)
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body.message).to.equal('Unauthorized');
          done();
        });
      });
      it('should return an error if the id of the favorite id of the recipe to be deleted is not an integer', (done) => {
        chai.request(app)
        .delete('/api/v1/favorites/Rachel')
        .set('token', ineneToken)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body.message).to.equal('Invalid request');
          done();
        });
      });
      it('should delete only the favorites of a signed in user', (done) => {
        chai.request(app)
        .delete('/api/v1/favorites/2')
        .set('token', neneToken)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.message).to.equal('Successfully deleted this recipe from your favorites');
          Favorite.findById(2).then(recipe => {
            expect(recipe).to.be.null;
            done();
          });
        });
      });
    });
  });