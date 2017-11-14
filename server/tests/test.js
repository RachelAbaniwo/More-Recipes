/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../database/models/index'
import bcrypt from 'bcrypt';

import app from '../app';
const expect = chai.expect;
chai.use(chaiHttp);
let signinDetailsTwo = {
	Username: 'Rae_bTwo',
	Password: 'rachel',
	};
let signinDetailsOne = {
	Username: 'Rae_b',
	Password: 'rachel',
  };
	 
let registerDetailsOne = {
  Firstname: 'Rachel',
  Lastname: 'Abaniwo',
  Username: 'Rae_b',
  Email: 'rae_@gmail.com',
  Password: 'rachel',
  };

let registerDestailsTwo = {
  Firstname: 'RachelTwo',
  Lastname: 'AbaniwoTwo',
  Username: 'Rae_bTwo',
  Email: 'raetwo_@gmail.com',
  Password: 'rachel',
  };
	 
describe('/UNKNOWN ROUTES/', () => {
  it('should return an error if an unregistered Route is called', (done) => {
    chai.request(app)
    .get('/api/v1/users/favorite')
    .end((error, response) => {
      
      expect(response.body).to.equal('UNKNOWN REQUEST.');
      done();
    });
  });
});

describe('/Unauthenticated/Unauthorised Endpoints', () => {
	describe('/recipes GET endpoint', () => {
    describe('/GET all Recipes and one Recipe/', () => {
      before(async () => {
        await db.Recipe.destroy({ where: {} });
        await db.Recipe.create({
          id: 1,
          name: 'Fried Noodles',
          category: 'Pasta',
          ingredients: 'Noodles, Pepper, Olive Oil, Onions',
          description: 'Noodles',
          method: 'fry noodles',
        });
      });
      after(async () => {
        await db.Recipe.destroy({ where: {} });
      });
      it('should return a list of all recipes when User requests for all recipes ', (done) => {
       
        chai.request(app)
        .get('/api/v1/recipes')
        .end((error, response) => {

          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.data.recipes[0].name).to.equal('Fried Noodles');
          expect(response.body.data.recipes[0].category).to.equal('Pasta');
          expect(response.body.data.recipes[0].ingredients).to.equal('Noodles, Pepper, Olive Oil, Onions');
          expect(response.body.data.recipes[0].description).to.equal('Noodles');
          expect(response.body.data.recipes[0].method).to.equal('fry noodles');
          expect(response.body.data.recipes[0].id).to.equal(1);
          done();
        });
      });
      it('should return the recipe with recipe ID requested by the User', (done) => {
        chai.request(app)
        .get('/api/v1/recipes/1')
        .end((error, response) => {
        const recipe = response.body.data.recipe;
            expect(response).to.have.status(200);
            expect(response.body).to.be.an('object');
            expect(recipe.name).to.equal('Fried Noodles');
            expect(recipe.category).to.equal('Pasta');
            expect(recipe.ingredients).to.equal('Noodles, Pepper, Olive Oil, Onions');
            expect(recipe.description).to.equal('Noodles');
            expect(recipe.method).to.equal('fry noodles');
            expect(recipe.id).to.equal(1);
            done();

            
        });
      });
    });
    it('should return an error if the recipe requested by the User doesn\'t exist', (done)=> {
      chai.request(app)
      .get('/api/v1/recipes/9000')
      .end((error, response) => {
        const recipe = response.body.data.recipe;
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body.data.message).to.equal('Recipe not found');
        done();
      });
    });
    it('should return an error if the id of the recipe requested by the User is not an Integer', (done) => {
      chai.request(app)
      .get('/api/v1/recipes/Rachel')
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body.data.message).to.equal('Invalid Request');
        done();
      });
    });
  });
});

describe('/Authenticated/Authorised Endpoints', () => {
  describe('/User Sign up and Sign In/', () => {
    describe('Sign User Up', () => {
      before(async () => {
        await db.User.destroy({ where: {} });
      });
      after(async () => {
        await db.User.destroy({ where: {} });
      });
      it('should Register a New User', (done) => {
        chai.request(app)
        .post('/api/v1/signup')
        .send(registerDetailsOne)
        .end((error, response) => {
            expect(response).to.have.status(201);
            expect(response.body.data.message).to.equal('Successfully signed up! Check Email for Activation link.');
            done();
        });
      });
    });
    it('should return correct validation error if New User doesn\'t fill all fields', (done) => {
      chai.request(app)
      .post('/api/v1/signup')
      .send({})
      .end((error, response) => {
        expect(response).to.have.status(422);
        const errors = response.body.data.errors;
          expect(errors).to.include('First name is Required!');
          expect(errors).to.include('Last name is Required!');
          expect(errors).to.include('Choose your User Name.');
          expect(errors).to.include('Email Address is Required!');
          expect(errors).to.include('Choose a Password');

        expect(response.body.data.message).to.equal('Please fix the validation errors');
        done();
      });
    });
    it('should return correct error if New User Registers with an Email already in use', (done) => {
      chai.request(app)
      .post('/api/v1/signup')
      .send({
        Firstname: 'Rachel',
        Lastname: 'Abaniwo',
        Username: 'RaeAban',
        Email: 'raeaban@gmail.com',
        Password: 'stella'

      })
      .end((error, response) => {
        expect(response).to.have.status(422);
        done();
      });
    });
    it('should return correct error if New User Registers with a User name already in use', (done) => {
      chai.request(app)
      .post('/api/v1/signup')
      .send({
        Firstname: 'Rachel',
        Lastname: 'Abaniwo',
        Username: 'RaAban',
        Email: 'rae_@gmail.com',
        Password: 'stella'

      })
      .end((error, response) => {
        expect(response).to.have.status(422);
        done();
      });
    });
    it('should return correct error if New User Registers with an Email with a wrong format', (done) => {
      chai.request(app)
      .post('/api/v1/signup')
      .send({
        Firstname: 'Rachel',
        Lastname: 'Abaniwo',
        Username: 'Raban',
        Email: 'raecom',
        Password: 'stella'

      })
      .end((error, response) => {
        expect(response).to.have.status(422);
        done();
      });
    });
    describe('Sign In User', () => {
      before(async () => {
        await db.User.destroy({ where: {} });
        await db.User.create({
          id: 1,
          Firstname: 'Rachel',
          Lastname: 'Abaniwo',
          Username: 'Rae_b',
          Email: 'rae_@gmail.com',
          Password: bcrypt.hashSync('rachel', 10),
        });
      });
      after(async () => {
        await db.User.destroy({ where: {} });
      });
      it('Should Sign In a Registered User', (done) => {
        chai.request(app)
        .post('/api/v1/signin')
        .send({
          Username: 'Rae_b',
          Password: 'rachel'
        })
        .end((error,response) => {
          console.log(response.body);
          expect(response).to.have.status(201);
          expect(response.body.data).to.have.property('token');
          let token = response.body.data.token;
          expect(response.body.data.message).to.equal('Successfully signed in.')
          done();
        });
      });
      it('should return correct error if wrong Password is inputed by the User Signing In', (done) => {
        chai.request(app)
        .post('/api/v1/signin')
        .send({
          Username: 'Rae_b',
          Password: 'stellaa',
        })
        .end((error, response) => {
          expect(response).to.have.status(422);
          expect(response.body.data.message).to.equal('Wrong credentials');
          done();
        });
      });
      it.only('should return correct error if User name of the User Signing In is not found', (done) => {
        chai.request(app)
        .post('/api/v1/signin')
        .send({
          Username: 'Raben',
          Password: 'stella'
        })
        .end((error, response) => {
          expect(response).to.have.status(422);
          expect(response.body.data.message).to.equal('User not found');
          done();
        });
      });
    });
    it('should return correct error if User does not fill all fields when Signing in', (done) => {
      chai.request(app)
      .post('/api/v1/signin')
      .send({})
      .end((error, response) => {
        expect(response).to.have.status(422);
        const errors = response.body.data.errors;
        expect(errors).to.include('The Username is required');
        expect(errors).to.include('The Password is required');
        expect(response.body.data.message).to.equal('Please fix the validation errors');
        done();
      });
    });
  });

  describe('/Authenticated Routes/', () => {
          
    describe('/GET Recipes Authenticated Routes/', () => {
      it('should return all recipes created by a User when called by that User', (done) => {
        chai.request(app)
        .get('/api/v1/users/myrecipes')
        .set('token', token)
        
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          
          done();
        });
      });
      it('should return an error if User is not Signed In', (done) => {
        chai.request(app)
        .get('/api/v1/users/myrecipes')
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body).to.be.an('object');
          expect(response.body.data.message).to.equal('Unauthenticated USER.');
          done();
        });
      });
      it('should return an error if Signed in User has no Recipes', (done) => {
        chai.request(app)
        .get('/api/v1/users/myrecipes')
        .set('token', signinToken)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.be.an('object');
          expect(response.body.data.message).to.equal('You have no Recipes');
          done();
        });
      });
      it('should return all recipes created by a User when called by another Signed in User', (done) => {
        chai.request(app)
        .get('/api/v1/users/1/recipes')
        .set('token', token)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          
          done();
        });
      });
      it('should return an error if the user calling the route isn\'t signed in', (done) => {
        chai.request(app)
        .get('/api/v1/users/1/recipes')
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body).to.be.an('object');
          expect(response.body.data.message).to.equal('Unauthenticated USER.');
          done();
        });
      });
      it('should return an error if the id of the User requested does not exist', (done) => {
        chai.request(app)
        .get('/api/v1/users/90/recipes')
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.be.an('object');
          expect(response.body.data.message).to.equal('User not Found');
          done();
        });
      });
      it('should return an error if the User being requested has no Recipes', (done) => {
        chai.request(app)
        .get('/api/v1/users/4/recipes')
        .set('token', token)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.be.an('object');
          expect(response.body.data.message).to.equal('User has no Recipes');
          done();
        });
      });
      it('should return an error if the id of the User requested is not an Integer', (done) => {
        chai.request(app)
        .get('/api/v1/users/Rachel/recipes')
        .set('token', token)
        .end((error, response) => {
          expect(response).to.have.status(422);
          expect(response.body).to.be.an('object');
          expect(response.body.data.message).to.equal('Invalid Request');
          done();
        });
      });
    });
    
    describe('/POST Recipes endpoints/', () => { 
      it('should add a new recipe when called by Signed in User', (done) => {
        chai.request(app)
        .post('/api/v1/recipes')
        .set('token', token)

        .send({
          name: "Ofaku",
          category: "Nigerian-Soup",
          ingredients:"Palm fruits",
          description: "description 1",
          method: "direction 1",
          })
        .end((error, response) => {
          expect(response).to.have.status(201);
          const recipe = response.body.data.recipe;
          expect(recipe.id).to.not.be.undefined;
          expect(recipe.name).to.equal('Ofaku');
          expect(recipe.category).to.equal('Nigerian-Soup');
          expect(recipe.ingredients).to.equal('Palm fruits');
          expect(recipe.description).to.equal('description 1');
          expect(recipe.method).to.equal('direction 1');
          expect(response.body).to.be.an('object');
          expect(response.body.data.message).to.equal('Successfully created recipe');
          console.log(recipe.id);
          done();
        });
      });
      it('it should return an error if User creating Recipe is not Signed In', (done) => {
        chai.request(app)
        .post('/api/v1/recipes')
        .send({
          name: "Ofaku",
          recipeType: "Nigerian-Soup",
          ingredients:"Palm fruits",
          description: "description 1",
          direction: "direction 1",
        })
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body).to.be.an('object');
          expect(response.body.data.message).to.equal('Unauthenticated USER.');
          
          done();
        });
      });
      it('it should return correct validation errors if wrong data is provided', (done) => {
        chai.request(app)
        .post('/api/v1/recipes')
        .set('token', token)
        .send({})
        .end((error, response) => {

          expect(response).to.have.status(422);
          
          const errors = response.body.data.errors;

          expect(errors).to.include('Recipe Name is required.');
          expect(errors).to.include('Recipe Category is required.');
          expect(errors).to.include('Recipe Ingredients are required.');
          expect(errors).to.include('Recipe Description is required.');
          expect(errors).to.include('Method required.');
          expect(response.body.data.message).to.equal('Please fill all Fields');

          done();
        });
      });
    });    
    
    describe('/UPDATE Recipes endpoints/', () => {
      it('it should update only the personal recipe of the Signed in User', (done) => {
        chai.request(app)
        .put('/api/v1/recipes/13')
        .set('token', token)
        .send({
          name: "Chicken Chilli Sauce",
          category: "Stews and Sauce",
          ingredients: "Chicken, Chilli Pepper, Veggies",
          description: "Sauce to be served along side pasta",
          method: "add Chicken, then add Chilli Pepper"
        })
        .end((error, response) => {
          expect(response).to.have.status(201);

          const recipe = response.body.data.recipe[1];
          expect(recipe.id).to.equal(13);
          expect(recipe.name).to.equal('Chicken Chilli Sauce');
          expect(recipe.category).to.equal('Stews and Sauce');
          expect(recipe.ingredients).to.equal('Chicken, Chilli Pepper, Veggies');
          expect(recipe.description).to.equal('Sauce to be served along side pasta');
          expect(recipe.method).to.equal('add Chicken, then add Chilli Pepper');
          expect(response.body.data.message).to.equal('Successfully updated recipe');

          done();
        });
      });
      it('it should return an error if User is not Signed in', (done) => {
        chai.request(app)
        .put('/api/v1/recipes/13')
        .send({
          name: "Chicken Chilli Sauce",
          category: "Stews and Sauce",
          ingredients: "Chicken, Chilli Pepper, Veggies",
          description: "Sauce to be served along side pasta",
          method: "add Chicken, then add Chilli Pepper"
        })
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body.data.message).to.equal('Unauthenticated USER.');

          done();
        });
      });
      it('it should return an error if Recipe to be updated is not found', (done) => {
        chai.request(app)
        .put('/api/v1/recipes/60')
        .set('token', token)
        .send({
          name: "Chicken Chilli Sauce",
          category: "Stews and Sauce",
          ingredients: "Chicken, Chilli Pepper, Veggies",
          description: "Sauce to be served along side pasta",
          method: "add Chicken, then add Chilli Pepper"
        })
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body.data.message).to.equal('Recipe not found');

          done();
        });
      });
      it('it should return an error if recipe to be updated is not personal recipe of the Signed in User', (done) => {
        chai.request(app)
        .put('/api/v1/recipes/1')
        .set('token', token)
        .send({
          name: "Chicken Chilli Sauce",
          category: "Stews and Sauce",
          ingredients: "Chicken, Chilli Pepper, Veggies",
          description: "Sauce to be served along side pasta",
          method: "add Chicken, then add Chilli Pepper"
        })
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body.data.message).to.equal('Unauthorized USER');

          done();
        });
      });
      it('it should return an error if the recipe id of the recipe to be updated is not an integer', (done) => {
        chai.request(app)
        .put('/api/v1/recipes/Rachel')
        .set('token', token)
        .send({
          recipeName: "Chicken Chilli Sauce",
          recipeType: "Stews and Sauce",
          ingredients: "Chicken, Chilli Pepper, Veggies",
          description: "Sauce to be served along side pasta",
          direction: "add Chicken, then add Chilli Pepper"
        })
        .end((error, response) => {
          expect(response).to.have.status(422); 
          expect(response.body.data.message).to.equal('Invalid Request');
          
          done();   
        });
      });
    });

    describe('/recipes DELETE endpoint', () => {
      it('it should return an error if User is not Signed in', (done) => {
        chai.request(app)
        .delete('/api/v1/recipes/12')
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body.data.message).to.equal('Unauthenticated USER.');

          done();
        });
      });
      it('it should return an error if Recipe to be deleted is not found', (done) => {
        chai.request(app)
        .delete('/api/v1/recipes/60')
        .set('token', token)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body.data.message).to.equal('Recipe not found');

          done();
        });
      });
      it('it should return an error if recipe to be deleted is not personal recipe of the Signed in User', (done) => {
        chai.request(app)
        .delete('/api/v1/recipes/1')
        .set('token', token)
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body.data.message).to.equal('Unauthorized USER');

          done();
        });
      });
      it('it should return an error if the recipe id of the recipe to be deleted is not an integer', (done) => {
        chai.request(app)
        .delete('/api/v1/recipes/Rachel')
        .set('token', token)
        .end((error, response) => {
          expect(response).to.have.status(422); 
          expect(response.body.data.message).to.equal('Invalid Request');
          
          done();   
        });
      });
      it('it should delete only the personal recipe of the Signed in User', (done) => {
        chai.request(app)
        .delete('/api/v1/recipes/12')
        .set('token', token)

        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.data.message).to.equal('Successfully deleted recipe');

          done();
          
        });
      });
    });
        
    describe('/POST Reviews endpoint', () => {
      it('it should add a review to the recipe whose Id is specified by a Signed in User', (done) => {
        chai.request(app)
        .post('/api/v1/recipes/2/review')
        .set('token', token)
        .send({
          review: "Awesome Stuff"
        })

        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body.data.review.review).to.equal('Awesome Stuff');
          expect(response.body.data.message).to.equal('Review successfully added!');
          
          done();

        });
      });
      it('it should return an error if User adding a review is not Signed in', (done) => {
        chai.request(app)
        .post('/api/v1/recipes/2/review')
        .send({
          review: "Awesome Stuff"
        })

        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body.data.message).to.equal('Unauthenticated USER.');
          
          done();

        });
      });
      it('it should return an error if the Id of the recipe to be reviewed does not exist', (done) => {
        chai.request(app)
        .post('/api/v1/recipes/1000/review')
        .set('token', token)
        .send({
          review: "Awesome Stuff"
        })

        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body.data.message).to.equal('Recipe to be reviewed not found');

          done();
        });
      });
      it('it should return an error if the Id of the recipe to be reviewed is not an integer', (done) => {
        chai.request(app)
        .post('/api/v1/recipes/Rachel/review')
        .set('token', token)
        .send({
          review: "Awesome Stuff"
        })

        .end((error, response) => {
          expect(response).to.have.status(422);
          expect(response.body.data.message).to.equal('Invalid Request');

          done();
        });
      });
      it('it should return an error if the Review field is empty', (done) => {
        chai.request(app)
        .post('/api/v1/recipes/Rachel/review')
        .set('token', token)
        .send({})

        .end((error, response) => {
          expect(response).to.have.status(422);
          expect(response.body.data.message).to.equal('Review field empty');

          done();
        });
      });
    });
    
    describe('/POST and Retrieve Favorite Recipes Routes/', () => {
      it('should add a Recipe of a Signed In User\'s choice to that User\'s List of Favorite Recipes', (done) => {
        chai.request(app)
        .post('/api/v1/users/favorite/1')
        .set('token', token)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body.data.message).to.equal('Recipe successfully added to Favorites!')

          done();
        });
      });
      it('should remove a Recipe of a Signed In User\'s List of Favorite Recipes when called twice for the same Recipe', (done) => {
        chai.request(app)
        .post('/api/v1/users/favorite/1')
        .set('token', token)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.data.message).to.equal('Successfully removed this recipe from Favorites')

          done();
        });
      });
      it('should return an error if User trying to add a recipe to his/her Favorites isn\'t signed in', (done) =>{
        chai.request(app)
        .post('/api/v1/users/favorite/1')
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body.data.message).to.equal('Unauthenticated USER.')

          done();
        });
      });
      it('should return an error if User is trying to add a recipe that doesn\'t exist to List of Favorites', (done) =>{
        chai.request(app)
        .post('/api/v1/users/favorite/9000')
        .set('token', token)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body.data.message).to.equal('Recipe not found.')

          done();
        });
      });
      it('should return an error if User is trying to add a recipe with an ID that isn\'t an integer to List of Favorites', (done) =>{
        chai.request(app)
        .post('/api/v1/users/favorite/Rachel')
        .set('token', token)
        .end((error, response) => {
          expect(response).to.have.status(422);
          expect(response.body.data.message).to.equal('Invalid Request.')

          done();
        });
      });
      it('should return an error if User is trying to add a Personal recipe to List of Favorites', (done) =>{
        chai.request(app)
        .post('/api/v1/users/favorite/15')
        .set('token', token)
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body.data.message).to.equal('Unauthorized.')

          done();
        });
      });
      it('should return a User\'s List of Favorites', (done) =>{
        chai.request(app)
        .get('/api/v1/users/favorites')
        .set('token', token)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          
          done();
        });
      });
      it('should return an Error if User has no Recipe in List of Favorites', (done) =>{
        chai.request(app)
        .get('/api/v1/users/favorites')
        .set('token', signinToken)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.be.an('object');
          expect(response.body.data.message).to.equal('You have no Favorite Recipes')
          done();
        });
      });
      it('should return an Error if User is not Signed In', (done) =>{
        chai.request(app)
        .get('/api/v1/users/favorites')
        
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body).to.be.an('object');
          expect(response.body.data.message).to.equal('Unauthenticated USER.')
          done();
        });
      });
    });
    
    describe('/POST UPVOTES to Recipes/', () => {
      it('should add an upvote to a Recipe when called by a Signed in User', (done) => {
        chai.request(app)
        .post('/api/v1/recipes/1/upvote')
        .set('token', token)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body.data.message).to.equal('Recipe Upvoted successfully')

          done();
        });
      });
      it('should add an upvote to a Recipe and Remove Downvote if Recipe was previously Downvoted', (done) => {
        
        chai.request(app)
        .post('/api/v1/recipes/3/downvote')
        .set('token', signinToken)
        .end((error, response) => {});
        
        chai.request(app)
        .post('/api/v1/recipes/3/upvote')
        .set('token', signinToken)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body.data.message).to.equal('Recipe Upvoted successfully')

          done();
        });
      });
      it('should remove an Upvote from a Recipe when called twice for the same Recipe by the same User', (done) => {
        chai.request(app)
        .post('/api/v1/recipes/1/upvote')
        .set('token', token)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.data.message).to.equal('Successfully removed Upvote from this recipe')

          done();
        });
      });
      it('should return an error if User trying to add an upvote isn\'t Signed In', (done) =>{
        chai.request(app)
        .post('/api/v1/recipes/1/upvote')
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body.data.message).to.equal('Unauthenticated USER.')

          done();
        });
      });
      it('should return an error if User is trying to add an upvote to a recipe that doesn\'t exist', (done) =>{
        chai.request(app)
        .post('/api/v1/recipes/9000/upvote')
        .set('token', token)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body.data.message).to.equal('Recipe not found.')

          done();
        });
      });
      it('should return an error if User is trying to Upvote a recipe with an ID that isn\'t an integer', (done) =>{
        chai.request(app)
        .post('/api/v1/recipes/Rachel/upvote')
        .set('token', token)
        .end((error, response) => {
          expect(response).to.have.status(422);
          expect(response.body.data.message).to.equal('Invalid Request.')

          done();
        });
      });
      it('should return an error if User is trying to add an Upvote to a Personal recipe', (done) =>{
        chai.request(app)
        .post('/api/v1/recipes/15/upvote')
        .set('token', token)
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body.data.message).to.equal('Unauthorized.')

          done();
        });
      });
    });;
    
    describe('/POST DOWNVOTES to Recipes/', () => {
      it('should add a Downvote to a Recipe when called by a Signed in User', (done) => {
        chai.request(app)
        .post('/api/v1/recipes/2/downvote')
        .set('token', token)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body.data.message).to.equal('Recipe Downvoted successfully')

          done();
        });
      });
      it('should add a Downvote to a Recipe and Remove Upvote if Recipe was previously Upvoted', (done) => {
        
        chai.request(app)
        .post('/api/v1/recipes/3/upvote')
        .set('token', token)
        .end((error, response) => {});
        
        chai.request(app)
        .post('/api/v1/recipes/3/downvote')
        .set('token', token)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body.data.message).to.equal('Recipe Downvoted successfully')

          done();
        });
      });
      it('should remove a downvote from a Recipe when called twice for the same Recipe by the same User', (done) => {
        chai.request(app)
        .post('/api/v1/recipes/2/downvote')
        .set('token', token)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.data.message).to.equal('Successfully removed Downvote from this recipe')

          done();
        });
      });
      it('should return an error if User trying to add a downvote isn\'t Signed In', (done) =>{
        chai.request(app)
        .post('/api/v1/recipes/1/downvote')
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body.data.message).to.equal('Unauthenticated USER.')

          done();
        })
      })
      it('should return an error if User is trying to add a downvote to a recipe that doesn\'t exist', (done) =>{
        chai.request(app)
        .post('/api/v1/recipes/9000/downvote')
        .set('token', token)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body.data.message).to.equal('Recipe not found.')

          done();
        })
      })
      it('should return an error if User is trying to downvote a recipe with an ID that isn\'t an integer', (done) =>{
        chai.request(app)
        .post('/api/v1/recipes/Rachel/downvote')
        .set('token', token)
        .end((error, response) => {
          expect(response).to.have.status(422);
          expect(response.body.data.message).to.equal('Invalid Request.')

          done();
        })
      })
      it('should return an error if User is trying to add a downvote to a Personal recipe', (done) =>{
        chai.request(app)
        .post('/api/v1/recipes/15/downvote')
        .set('token', token)
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body.data.message).to.equal('Unauthorized.')

          done();
        })
      })
    });
  });
});

        
