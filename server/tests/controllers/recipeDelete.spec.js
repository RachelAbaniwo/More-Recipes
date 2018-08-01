/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import mockData from '../mockData';
import db from '../../models';

const { Recipe } = db;
const expect = chai.expect;
let rachelToken, ineneToken, nelsonToken;

const { rachel, inene, nelson, ofada, chickenChilli } = mockData;

chai.use(chaiHttp);

describe('RECIPE CONTROLLER', () => {
  describe('Delete Recipe', () => {
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

    it('should return an error if user trying to delete a recipe is not signed in', (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/3')
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body.message).to.equal('Unauthenticated');
          done();
        });
    });
    it('should return an error if recipe to be deleted is not found', (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/10')
        .set('token', ineneToken)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body.message).to.equal('Recipe not found');
          done();
        });
    });
    it('should return an error if recipe to be deleted is not personal recipe of the signed in user', (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/3')
        .set('token', ineneToken)
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body.message).to.equal('Unauthorized');
          done();
        });
    });
    it('should return an error if the recipe id of the recipe to be deleted is not an integer', (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/Rachel')
        .set('token', nelsonToken)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body.message).to.equal('Invalid request');
          done();
        });
    });
    it('should delete only the personal recipe of the signed in user', (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/3')
        .set('token', rachelToken)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.message).to.equal('Successfully deleted recipe');
          Recipe.findById(3).then(recipe => {
            expect(recipe).to.be.null;
            done();
          });
        });
    });
  });
});
