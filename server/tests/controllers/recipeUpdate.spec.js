/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import mockData from '../mockData'

const expect = chai.expect;
let user1Token, user2Token, user3Token, user1, user2, user3;

const { signinUser1, signinUser2, signinUser3, recipe1, updateRecipe, wrongUpdateRecipe } = mockData;

chai.use(chaiHttp);

describe('RECIPE CONTROLLER', () => {

  describe('Update Recipe', () => {
    
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
      .send(signinUser2)
      .end((error, response) => {
        user2Token = response.body.token;
        user2 = response.body.user;
      });
      chai.request(app)
      .post('/api/v1/users/signin')
      .send(signinUser3)
      .end((error, response) => {
        user3Token = response.body.token;
        user3 = response.body.user;
        done();
      });
    });
    
    it('should update the personal recipe of the signed in user', (done) => {
      chai.request(app)
      .put('/api/v1/recipes/4')
      .set('token', user1Token)
      .send(updateRecipe)
      .end((error, response) => {
        expect(response).to.have.status(201);
        const recipe = response.body.recipe;
        expect(recipe.id).to.equal(4);
        expect(recipe.name).to.equal('Chicken Chilli Sauce');
        expect(recipe.category).to.equal('Stews and Sauce');
        expect(response.body.message).to.equal('Successfully updated recipe');
        done();
      });
    });
    it('should return the original field content of the recipe if wrong characters are filled in the fields', (done) => {
      chai.request(app)
      .put('/api/v1/recipes/4')
      .set('token', user1Token)
      .send(wrongUpdateRecipe)
      .end((error, response) => {
        expect(response).to.have.status(201);
        const recipe = response.body.recipe;
        expect(recipe.id).to.equal(4);
        expect(recipe.name).to.equal('Chicken Chilli Sauce');
        expect(recipe.category).to.equal('Stews and Sauce');
        expect(response.body.message).to.equal('Successfully updated recipe');
        done();
      });
    });
    it('should return an error if user is not signed in', (done) => {
      chai.request(app)
      .put('/api/v1/recipes/1')
      .send(updateRecipe)
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthenticated');
        done();
      });
    });
    it('should return an error if recipe to be updated is not found', (done) => {
      chai.request(app)
      .put('/api/v1/recipes/10')
      .set('token', user1Token)
      .send(updateRecipe)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('Recipe not found');
        done();
      });
    });
    it('should return an error if recipe to be updated is not personal recipe of the signed in user', (done) => {
      chai.request(app)
      .put('/api/v1/recipes/1')
      .set('token', user2Token)
      .send(updateRecipe)
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Unauthorized');
        done();
      });
    });
    it('should return an error if the recipe id of the recipe to be updated is not an integer', (done) => {
      chai.request(app)
      .put('/api/v1/recipes/Rachel')
      .set('token', user1Token)
      .send(updateRecipe)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid request');
        done();
      });
    });
  });
});