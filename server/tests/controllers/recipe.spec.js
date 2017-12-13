/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import data from '../mockData'

const expect = chai.expect;
let user1Token, user2Token, user3Token, user1, user2, user3;
const { signinUser1, signinUser2, signinUser3, recipe1, updateRecipe } = data;

chai.use(chaiHttp);

describe('UNKNOWN ROUTES', () => {
  it('should return an error when called', (done) => {
    chai.request(app)
    .get('/api/v1/users/favorite')
    .end((error, response) => {
      
      expect(response.body).to.equal('UNKNOWN REQUEST.');
      done();
    });
  });
});

describe('RECIPE CONTROLLER', () => {

    
  describe('Retrieve Recipes', () => {
      
    it('should return a list of all recipes when User requests for all recipes ', (done) => {
      chai.request(app)
      .get('/api/v1/recipes')
      .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.recipes[0].name).to.equal('Fried Noodles');
          expect(response.body.recipes[0].id).to.equal(1);
          expect(response.body.recipes[0].userId).to.equal(1);
          done();
      });
    });
    it('should return the recipe with recipe ID requested by the User', (done) => {
      chai.request(app)
      .get('/api/v1/recipes/1')
      .end((error, response) => {
        const recipe = response.body.recipe;
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(recipe.name).to.equal('Fried Noodles');
        expect(recipe.id).to.equal(1);
        done();
      });
    });
    it('should return an error if the recipe requested by the User doesn\'t exist', (done) => {``
      chai.request(app)
      .get('/api/v1/recipes/5')
      .end((error, response) => {
        const recipe = response.body.recipe;
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Recipe not found');
        done();
      });
    });
    it('should return an error if the id of the recipe requested by the User is not an Integer', (done) => {
      chai.request(app)
      .get('/api/v1/recipes/Rachel')
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Invalid Request');
        done();
      });
    });
  });

  describe('Create Recipe', () => {

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
    
    it('should add a new recipe when called by Signed in User', (done) => {
      chai.request(app)
      .post('/api/v1/recipes')
      .set('token', user1Token)
      .send(recipe1)
      .end((error, response) => {
        expect(response).to.have.status(201);
        const recipe = response.body.recipe;
        expect(recipe.id).to.not.be.undefined;
        expect(recipe.name).to.equal('Ofada Rice');
        expect(recipe.category).to.equal('Rice');
        expect(recipe.ingredients).to.equal('Ofada Rice, Pepper, Olive Oil, Onions');
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Successfully created recipe');
        done();
      });
    });
    it('it should return an error if User creating Recipe is not Signed In', (done) => {
      chai.request(app)
      .post('/api/v1/recipes')
      .send(recipe1)
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Unauthenticated USER.');
        done();
      });
    });
    it('it should return correct validation errors if wrong data is provided', (done) => {
      chai.request(app)
      .post('/api/v1/recipes')
      .set('token', user1Token)
      .send({})
      .end((error, response) => {
        expect(response).to.have.status(400);
        const errors = response.body.errors;
        expect(errors).to.include('Recipe Name is required.');
        expect(errors).to.include('Recipe Category is required.');
        expect(errors).to.include('Recipe Ingredients are required.');
        expect(errors).to.include('Recipe Description is required.');
        expect(errors).to.include('Method required.');
        expect(response.body.message).to.equal('Please fill all Fields');
        done();
      });
    });
  });
});
