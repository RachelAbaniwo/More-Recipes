/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../database/models/index'

import app from '../app';
const expect = chai.expect;
chai.use(chaiHttp);
let loginDetails = {
    Username: 'RaeAban',
    Password: 'rachel',
  };
   
let registerDetails = {
    Firstname: 'Rachel',
    Lastname: 'Abaniwo',
    Username: 'Rae_b',
    Email: 'rae_@gmail.com',
    Password: 'rachel',
  };
   

describe('/Unauthenticated/Unauthorised Endpoints', () => {
    describe('/recipes GET endpoint', () => {
        it('should return a list of all recipes when User requests for all recipes ', (done) => {
            chai.request(app)
            .get('/api/v1/recipes')
            .end((error, response) => {

                expect(response).to.have.status(200);
                expect(response.body).to.be.an('object');
    
                done();
            });
        });
       it('should return the recipe with recipe ID requested by the User', (done) =>{
           chai.request(app)
           .get('/api/v1/recipes/1')
           .end((error, response) => {
            const recipe = response.body.data.recipe;
               expect(response).to.have.status(200);
               expect(response.body).to.be.an('object');
               expect(recipe.id).to.equal(1);
               done();

               
           });
       });
       it('should return an error if the recipe requested by the User doesn\'t exist', (done)=> {
         chai.request(app)
        .get('/api/v1/recipes/100')
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
     it('should return all recipes created by a User when called by that User', (done) => {
        chai.request(app)
       .get('/api/v1/users/myrecipes')
       
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
     it('should return an error if the id of the User requested is not an Integer', (done) => {
        chai.request(app)
       .get('/api/v1/users/Rachel/recipes')
       .end((error, response) => {
           expect(response).to.have.status(422);
           expect(response.body).to.be.an('object');
           expect(response.body.data.message).to.equal('Invalid Request');
           done();
         });
     });
     it('should return an error if the User being requested has no Recipes', (done) => {
        chai.request(app)
       .get('/api/v1/users/1/recipes')
       .end((error, response) => {
           expect(response).to.have.status(404);
           expect(response.body).to.be.an('object');
           expect(response.body.data.message).to.equal('User has no Recipes');
           done();
         });
      });
   });
});



describe('/Authenticated/Authorised Endpoints', () => {
    chai.request(app)
    .post('/api/v1/signin')
    .send(loginDetails)
    .end((error,response) => {
        
        
        let token = response.body.data.token;
    /*beforeEach((done) => {
        // Reset user mode before each test
        db.User.destroy({}, (error) => {
          console.log(error);
          done();
        })
      });*/
    describe('/User Sign up and Sign In/', () => {

        /*it('should Register a New User', (done) => {
            chai.request(app)
            .post('/api/v1/signup')
            .send(registerDetails)
            .end((error, response) => {
                expect(response).to.have.status(201);
                expect(response.body.data.message).to.equal('Successfully signed up! Check Email for Activation link.');
                done();
           });
        });*/
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
        it('Should Sign In a Registered User', (done) => {
            chai.request(app)
            .post('/api/v1/signin')
            .send(loginDetails)
            .end((error,response) => {
                expect(response).to.have.status(201);
                expect(response.body.data).to.have.property('token');
                let token = response.body.data.token;
                expect(response.body.data.message).to.equal('Successfully signed in.')
                done();
            });
        });
    
    });
 });

    describe('/recipes POST endpoint', () => { 
        it('it should add a new recipe to the recipes', (done) => {
            chai.request(app)
                .post('/api/v1/recipes')
                .send({
                    recipeName: "Ofaku",
                    recipeType: "Nigerian-Soup",
                    ingredients:"Palm fruits",
                    description: "description 1",
                    direction: "direction 1",
                })
                .end((error, response) => {
                    expect(response).to.have.status(201);
                    const recipe = response.body.data.recipe;
                    expect(recipe.id).to.not.be.undefined;
                    expect(recipe.recipeName).to.equal('Ofaku');
                    expect(recipe.recipeType).to.equal('Nigerian-Soup');
                    expect(recipe.ingredients).to.equal('Palm fruits');
                    expect(recipe.description).to.equal('description 1');
                    expect(recipe.direction).to.equal('direction 1');
                    expect(recipe.upvotes).to.equal(0);
                    expect(recipe.downvotes).to.equal(0);
                    expect(recipe.favorites).to.equal(0);

                    done();
                });
        });
        it('it should return correct validation errors if wrong data is provided', (done) => {
            chai.request(app)
                .post('/api/v1/recipes')
                .send({})
                .end((error, response) => {

                    expect(response).to.have.status(422);
                    
                    const errors = response.body.data.errors;

                    expect(errors).to.include('Recipe Name is required.');
                    expect(errors).to.include('Recipe Type is required.');
                    expect(errors).to.include('Recipe Ingredients are required.');
                    expect(errors).to.include('Recipe Description is required.');
                    expect(errors).to.include('Recipe Directions are required.');
                    expect(response.body.data.message).to.equal('Please fix the validation errors');

                    done();
                });
        });
    });

    describe('/recipes PUT endpoint', () => {
        it('it should update the recipe with specified recipe Id', (done) => {
             chai.request(app)
            .put('/api/v1/recipes/1')
            .send({
                recipeName: "Chicken Chilli Sauce",
                recipeType: "Stews and Sauce",
                ingredients: "Chicken, Chilli Pepper, Veggies",
                description: "Sauce to be served along side pasta",
                direction: "add Chicken, then add Chilli Pepper"
            })
            .end((error, response) => {
                expect(response).to.have.status(201);

                const recipe = response.body.data.recipe;
                expect(recipe.id).to.equal(1);
                expect(recipe.recipeName).to.equal('Chicken Chilli Sauce');
                expect(recipe.recipeType).to.equal('Stews and Sauce');
                expect(recipe.ingredients).to.equal('Chicken, Chilli Pepper, Veggies');
                expect(recipe.description).to.equal('Sauce to be served along side pasta');
                expect(recipe.direction).to.equal('add Chicken, then add Chilli Pepper');

                done();
            });
        });
        it('it should return an error if the recipe id of the recipe to be updated is not specified', (done) => {
            chai.request(app)
            .put('/api/v1/recipes/Rachel')
            .send({
                recipeName: "Chicken Chilli Sauce",
                recipeType: "Stews and Sauce",
                ingredients: "Chicken, Chilli Pepper, Veggies",
                description: "Sauce to be served along side pasta",
                direction: "add Chicken, then add Chilli Pepper"
            })
            .end((error, response) => {
                expect(response).to.have.status(404); 
                expect(response.body.data.message).to.equal('the recipe was not found in the database');
                
                done();   
            });
        });
    });

    describe('/recipes DELETE endpoint', () => {
        it('it should delete the recipe with specified recipe Id', (done) => {
            chai.request(app)
            .delete('/api/v1/recipes/1')

            .end((error, response) => {
                expect(response).to.have.status(200);
                expect(response.body.data.message).to.equal('Recipe successfully deleted.');

                done();
                
            });
        });
        it('it should return an error if recipe Id is not specified', (done) => {
            chai.request(app)
            .delete('/api/v1/recipes/Rachel')

            .end((error, response) => {
                expect(response).to.have.status(404);
                expect(response.body.data.message).to.equal('the recipe to be deleted was not found in the database');

                done();
            });
        });
    });

    describe('/recipes POST endpoint', () => {
        it('it should add a review to the recipe whose Id is specified', (done) => {
            chai.request(app)
            .post('/api/v1/recipes/2/review')
            .send({
                reviews: "Awesome Stuff"
            })

            .end((error, response) => {
                expect(response).to.have.status(201);
                expect(response.body.data.recipe.reviews).to.include('Awesome Stuff');
                expect(response.body.data.message).to.equal('Review successfully added!');
                
                done();

            });
        });
        it('it should return an error if the Id of the recipe to be reviewed does not exist', (done) => {
            chai.request(app)
            .post('/api/v1/recipes/7/review')
            .send({
                reviews: "Awesome Stuff"
            })

            .end((error, response) => {
                expect(response).to.have.status(404);
                expect(response.body.data.message).to.equal('the recipe you want to review was not found in the database!');

                done();
            });
        });
    });
});

