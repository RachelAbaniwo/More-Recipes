/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import mockData from '../mockData'

const expect = chai.expect;
let rachelToken, ineneToken, nelsonToken;
const { rachel, inene, nelson, ofada, chickenChilli } = mockData;

chai.use(chaiHttp);

describe('UNKNOWN ROUTES', () => {
  it('should return an error when called', (done) => {
    chai.request(app)
    .post('/api/v1/recipes/users/favorite')
    .end((error, response) => {
      
      expect(response.body).to.equal('UNKNOWN REQUEST.');
      done();
    });
  });
});

describe('RECIPE CONTROLLER', () => {
  describe('Retrieve Recipes', () => {
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
    it('should fetch all recipes when an authenticated user requests for all recipes ', (done) => {
      chai.request(app)
      .get('/api/v1/recipes')
      .set('token', rachelToken)
      .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.recipes[0].name).to.equal('Fried Noodles');
          expect(response.body.recipes[0].id).to.equal(1);
          expect(response.body.recipes[0].userId).to.equal(1);
          expect(response.body.recipes.length).to.equal(6)
          done();
      });
    });
    it('should fetch all recipes when an unauthenticated user requests for all recipes ', (done) => {
      chai.request(app)
      .get('/api/v1/recipes')
      .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.recipes[0].name).to.equal('Fried Noodles');
          expect(response.body.recipes[0].id).to.equal(1);
          expect(response.body.recipes[0].userId).to.equal(1);
          expect(response.body.recipes.length).to.equal(6)
          done();
      });
    });
    it('should retrieve sorted recipes according to the property indicated by an authenticated user', (done) => {
      chai.request(app)
      .get('/api/v1/recipes?sort=favorites')
      .set('token', rachelToken)
      .end((error, response) => {
        const { recipes } = response.body;
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(recipes[0].name).to.equal('Nigerian Doughnut');
        expect(recipes[0].id).to.equal(5);
        expect(recipes[0].userId).to.equal(2);
        expect(recipes[0].favorites >= recipes[1].favorites);
        expect(recipes[1].favorites >= recipes[2].favorites);        
        done();
      });
    });
    it('should retrieve sorted recipes according to the property indicated by an unauthenticated user', (done) => {
      chai.request(app)
      .get('/api/v1/recipes?sort=favorites')
      .end((error, response) => {
        const { recipes } = response.body;
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(recipes[0].name).to.equal('Nigerian Doughnut');
        expect(recipes[0].id).to.equal(5);
        expect(recipes[0].userId).to.equal(2);
        expect(recipes[0].favorites >= recipes[1].favorites);
        expect(recipes[1].favorites >= recipes[2].favorites);        
        done();
      });
    });
    it('should retrieve recipes that match the keywords searched by an authenticated user', (done) => {
      chai.request(app)
      .get('/api/v1/recipes?search=Chicken Sauce')
      .set('token', rachelToken)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.recipes[0].name).to.equal('Chicken Sauce');
        expect(response.body.recipes[0].id).to.equal(4);
        expect(response.body.recipes[0].userId).to.equal(1);
        done();
      });
      it('should retrieve recipes that match the keywords searched by an unauthenticated user', (done) => {
        chai.request(app)
        .get('/api/v1/recipes?search=Chicken Sauce')
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.recipes[0].name).to.equal('Chicken Sauce');
          expect(response.body.recipes[0].id).to.equal(4);
          expect(response.body.recipes[0].userId).to.equal(1);
          done();
        });
    });
    it('should return the recipe with recipe ID requested an authenticated user', (done) => {
      chai.request(app)
      .get('/api/v1/recipes/1')
      .set('token', rachelToken)
      .end((error, response) => {
        const recipe = response.body.recipe;
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(recipe.name).to.equal('Fried Noodles');
        expect(recipe.id).to.equal(1);
        done();
      });
    });
    it('should return the recipe with recipe ID requested an unauthenticated user', (done) => {
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
    it('should return an error if the recipe requested by the user doesn\'t exist', (done) => {``
      chai.request(app)
      .get('/api/v1/recipes/10')
      .end((error, response) => {
        const recipe = response.body.recipe;
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Recipe not found');
        done();
      });
    });
    it('should return an error if the id of the recipe requested by the user is not an integer', (done) => {
      chai.request(app)
      .get('/api/v1/recipes/Rachel')
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Invalid request');
        done();
      });
    });
  });
});

  describe('Create Recipe', () => {
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
    
    it('should add a new recipe when called by signed in user', (done) => {
      chai.request(app)
      .post('/api/v1/recipes')
      .set('token', rachelToken)
      .send(ofada)
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
    it('it should return an error if user creating recipe is not signed in', (done) => {
      chai.request(app)
      .post('/api/v1/recipes')
      .send(ofada)
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Unauthenticated');
        done();
      });
    });
    it('it should return correct validation errors if wrong data is provided', (done) => {
      chai.request(app)
      .post('/api/v1/recipes')
      .set('token', rachelToken)
      .send({})
      .end((error, response) => {
        expect(response).to.have.status(400);
        const errors = response.body.errors;
        expect(errors).to.include('Recipe Name is required.');
        expect(errors).to.include('Recipe Category is required.');
        expect(errors).to.include('Recipe Ingredients are required.');
        expect(errors).to.include('Recipe Description is required.');
        expect(errors).to.include('Method required.');
        expect(response.body.message).to.equal('Please fill all fields');
        done();
      });
    });
  });
});

