/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../../models/index'
import bcrypt from 'bcrypt';
import faker from 'faker';
import jwt from 'jsonwebtoken';
import app from '../../app';
const expect = chai.expect;
chai.use(chaiHttp);


	 
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

  describe('/GET all Recipes and one Recipe/', () => {
    it('should return a list of all recipes when User requests for all recipes ', (done) => {
      const thisUser = {
        Firstname: faker.name.firstName(),
        Lastname: faker.name.lastName(),
        Username: faker.internet.userName(),
        Email: faker.internet.email(),
        Password: bcrypt.hashSync(faker.internet.password(), 10)
      };
      db.User.create(thisUser).then((user) => {
        db.Recipe.create({
          name: 'Fried Noodles',
          category: 'Pasta',
          ingredients: 'Noodles, Pepper, Olive Oil, Onions',
          description: 'Noodles',
          method: 'fry noodles',
          userId: user.id,
        }).then((recipe) => {
          chai.request(app)
          .get('/api/v1/recipes')
          .end((error, response) => {

            expect(response).to.have.status(200);
            expect(response.body).to.be.an('object');
            expect(response.body.data.recipes[0].name).to.equal('Fried Noodles');
            expect(response.body.data.recipes[0].id).to.equal(recipe.id);
            expect(response.body.data.recipes[0].userId).to.equal(user.id);
          });
        });
      });
      done();
    });
    it('should return the recipe with recipe ID requested by the User', (done) => {
      const thisUser = {
        Firstname: faker.name.firstName(),
        Lastname: faker.name.lastName(),
        Username: faker.internet.userName(),
        Email: faker.internet.email(),
        Password: bcrypt.hashSync(faker.internet.password(), 10)
      };
      db.User.create(thisUser).then((user) => {
        db.Recipe.create({
          name: 'Fried Noodles',
          category: 'Pasta',
          ingredients: 'Noodles, Pepper, Olive Oil, Onions',
          description: 'Noodles',
          method: 'fry noodles',
          userId: user.id,
        }).then((newRecipe) => {
          chai.request(app)
          .get('/api/v1/recipes/newRecipe.id')
          .end((error, response) => {
          const recipe = response.body.data.recipe;
            expect(response).to.have.status(200);
            expect(response.body).to.be.an('object');
            expect(recipe.name).to.equal('Fried Noodles');
            expect(recipe.id).to.equal(newRecipe.id);
          });
        });
      });
      done();
    });
    it('should return an error if the recipe requested by the User doesn\'t exist', (done)=> {
      const thisUser = {
        Firstname: faker.name.firstName(),
        Lastname: faker.name.lastName(),
        Username: faker.internet.userName(),
        Email: faker.internet.email(),
        Password: bcrypt.hashSync(faker.internet.password(), 10)
      };
      db.User.create(thisUser).then((user) => {
        db.Recipe.create({
          name: 'Fried Noodles',
          category: 'Pasta',
          ingredients: 'Noodles, Pepper, Olive Oil, Onions',
          description: 'Noodles',
          method: 'fry noodles',
          userId: user.id,
        }).then((newRecipe) => {
          db.Recipe.destroy({where:{id: newRecipe}}).then(() => {
            chai.request(app)
            .get('/api/v1/recipes/newRecipe.id')
            .end((error, response) => {
              const recipe = response.body.data.recipe;
              expect(response).to.have.status(404);
              expect(response.body).to.be.an('object');
              expect(response.body.data.message).to.equal('Recipe not found');
            });
          });
        });
      });
      done();
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
    it('should Register a New User', (done) => {
      chai.request(app)
      .post('/api/v1/signup')
      .send({
        Firstname: faker.name.firstName(),
        Lastname: faker.name.lastName(),
        Username: faker.internet.userName(),
        Email: faker.internet.email(),
        Password: faker.internet.password(),
      })
      .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body.data.message).to.equal('Successfully signed up! Check Email for Activation link.');
          done();
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
      const password = faker.internet.password();
      const fakeUserSignup = {
        Firstname: faker.name.firstName(),
        Lastname: faker.name.lastName(),
        Username: faker.internet.userName(),
        Email: faker.internet.email(),
        Password: bcrypt.hashSync(password, 10)
      };

      db.User.create(fakeUserSignup).then((newUser) => {
        chai.request(app)
        .post('/api/v1/signup')
        .send({
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: fakeUserSignup.Email,
          Password:faker.internet.password(), 
        })
        .end((error, response) => {
          console.log(response.body);
        expect(response).to.have.status(422);
        expect(response.body.data.message).to.equal('The Email already exists.');
        done();
        });
      });
    });
    it('should return correct error if New User Registers with a User name already in use', (done) => {
      const password = faker.internet.password();
      const fakeUserSignup = {
        Firstname: faker.name.firstName(),
        Lastname: faker.name.lastName(),
        Username: faker.internet.userName(),
        Email: faker.internet.email(),
        Password: bcrypt.hashSync(password, 10)
      };

      db.User.create(fakeUserSignup).then((newUser) => {
        chai.request(app)
        .post('/api/v1/signup')
        .send({
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: fakeUserSignup.Username,
          Email: faker.internet.email(),
          Password: faker.internet.password(), 
        })
        .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body.data.message).to.equal('The Username is already in use.');
        done();
        });
      });
    });
    it('should return correct error if New User Registers with an Email with a wrong format', (done) => {
      chai.request(app)
      .post('/api/v1/signup')
      .send({
        Firstname: faker.name.firstName(),
        Lastname: faker.name.lastName(),
        Username: faker.internet.userName(),
        Email: 'nene.com',
        Password: faker.internet.password(),

      })
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body.data.message).to.equal('Validation error: The Email entered is invalid');
        done();
      });
    });
    describe('Sign In User', () => {
      it('Should Sign In a Registered User', (done) => {
        const password = faker.internet.password();
        const fakeUserSignin = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(password, 10)
        };

        db.User.create(fakeUserSignin).then((newUser) => {
          chai.request(app)
          .post('/api/v1/signin')
          .send({
            Username: newUser.Username,
            Password: password
          })
          .end((error,response) => {

            expect(response).to.have.status(201);
            expect(response.body.data).to.have.property('token');
   
            expect(response.body.data.message).to.equal('Successfully signed in.');
          });
        });
        done();
      });
      it('should return correct error if wrong Password is inputed by the User Signing In', (done) => {
        const password = faker.internet.password();
        const userSignin = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(password, 10)
        };

        db.User.create(userSignin).then((newUser) => {
          chai.request(app)
          .post('/api/v1/signin')
          .send({
            Username: newUser.Username,
            Password: 'stella'
          })
          .end((error,response) => {
          expect(response).to.have.status(422);
          expect(response.body.data.message).to.equal('Wrong credentials');
          });
        });
        done();
      });
      it('should return correct error if User name of the User Signing In is not found', (done) => {
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
   });
  describe('/Authenticated Routes/', () => {
          
    describe('/GET Recipes Authenticated Routes/', () => {
      it('should return all recipes created by a User when called by that User', (done) => {
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((user) => {
          const token = jwt.sign(user.get(), 'secret');

          db.Recipe.create({
            name: 'Fried Noodles',
            category: 'Pasta',
            ingredients: 'Noodles, Pepper, Olive Oil, Onions',
            description: 'Noodles',
            method: 'fry noodles',
            userId: user.id
          }).then((newRecipe) => {
            chai.request(app)
            .get('/api/v1/users/myrecipes')
            .set('token', token)
            
            .end((error, response)=>{
              const recipe = response.body.data.recipe;
              expect(response).to.have.status(200);
              expect(response.body.data.recipes[0].name).to.equal(newRecipe.name);
              expect(response.body.data.recipes[0].userId).to.equal(user.id);
            });
          });
        });
        done();
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
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((user) => {
          const token = jwt.sign(user.get(), 'secret');
          chai.request(app)
          .get('/api/v1/users/myrecipes')
          .set('token', token)
          .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.be.an('object');
          expect(response.body.data.message).to.equal('You have no Recipes')
          });
        });
        done();
      });
      it('should return all recipes created by a User when called by another Signed in User', (done) => {
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        const anotherUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const tokenone = jwt.sign(userone.get(), 'secret');
          db.User.create(anotherUser).then((user) => {
            db.Recipe.create({
              name: 'Fried Noodles',
              category: 'Pasta',
              ingredients: 'Noodles, Pepper, Olive Oil, Onions',
              description: 'Noodles',
              method: 'fry noodles',
              userId: user.id
            }).then((newRecipe) => {
              chai.request(app)
              .get('/api/v1/users/user.id/recipes')
              .set('token', tokenone)
              
              .end((error, response)=>{
                const recipe = response.body.data.recipe;
                expect(response).to.have.status(200);
                expect(response.body.data.recipes[0].name).to.equal(newRecipe.name);
                expect(response.body.data.recipes[0].userId).to.equal(user.id);
              });
            });
          });
        });
        done();
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
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        const anotherUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((user) => {
          const token = jwt.sign(user.get(), 'secret');
          db.User.create(anotherUser).then((userone) => {
            db.User.destroy({where: {id: userone.id}}).then(()=>{
              chai.request(app)
              .get('/api/v1/users/userone.id/recipes')
              .set('token', token)
              .end((error, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.be.an('object');
                expect(response.body.data.message).to.equal('User not Found');
              });
            });
          });
        });
        done();
      });
      it('should return an error if the User being requested has no Recipes', (done) => {
        const oneUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(oneUser).then((userone) => {
          const token = jwt.sign(userone.get(), 'secret');
          db.User.create(thisUser).then((user) => {
            chai.request(app)
            .get('/api/v1/users/user.id/recipes')
            .set('token', token)
            .end((error, response) => {
              expect(response).to.have.status(404);
              expect(response.body).to.be.an('object');
              expect(response.body.data.message).to.equal('User has no Recipes');
            });
          });
        });
        done();
      });
      it('should return an error if the id of the User requested is not an Integer', (done) => {
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const token = jwt.sign(userone.get(), 'secret');
          chai.request(app)
          .get('/api/v1/users/Rachel/recipes')
          .set('token', token)
          .end((error, response) => {
            expect(response).to.have.status(422);
            expect(response.body).to.be.an('object');
            expect(response.body.data.message).to.equal('Invalid Request');
          });
        });
        done();
      });
    });
    
    describe('/POST Recipes endpoints/', () => { 
      it('should add a new recipe when called by Signed in User', (done) => {
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const token = jwt.sign(userone.get(), 'secret');
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
          });
        });
        done();
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
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const token = jwt.sign(userone.get(), 'secret');
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
          });
        });
        done();
      });    
    });
      
    describe('/UPDATE Recipes endpoints/', () => {
      it('it should update the personal recipe of the Signed in User', (done) => {
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((user) => {
          const token = jwt.sign(user.get(), 'secret');

          db.Recipe.create({
            name: 'Fried Noodles',
            category: 'Pasta',
            ingredients: 'Noodles, Pepper, Olive Oil, Onions',
            description: 'Noodles',
            method: 'fry noodles',
            userId: user.id
          }).then((newRecipe) => {
            chai.request(app)
            .put('/api/v1/recipes/newRecipe.id')
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
            });
          });
        });
        done();
      });
      it('it should return an error if User is not Signed in', (done) => {
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((user) => {
          const token = jwt.sign(user.get(), 'secret');

          db.Recipe.create({
            name: 'Fried Noodles',
            category: 'Pasta',
            ingredients: 'Noodles, Pepper, Olive Oil, Onions',
            description: 'Noodles',
            method: 'fry noodles',
            userId: user.id
          }).then((newRecipe) => {
            chai.request(app)
            .put('/api/v1/recipes/newRecipe.id')
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
            });
          });
        });
        done();
      });
      it('it should return an error if Recipe to be updated is not found', (done) => {
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((user) => {
          const token = jwt.sign(user.get(), 'secret');

          db.Recipe.create({
            name: 'Fried Noodles',
            category: 'Pasta',
            ingredients: 'Noodles, Pepper, Olive Oil, Onions',
            description: 'Noodles',
            method: 'fry noodles',
            userId: user.id
          }).then((newRecipe) => {
            db.Recipe.destroy({where:{id:newRecipe.id}}).then(() => {
              chai.request(app)
              .put('/api/v1/recipes/newRecipe.id')
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
              });
            });
          });
        });
        done();
      });
      it('it should return an error if recipe to be updated is not personal recipe of the Signed in User', (done) => {
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        const anotherUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const tokenone = jwt.sign(userone.get(), 'secret');
          db.User.create(anotherUser).then((user) => {
            db.Recipe.create({
              name: 'Fried Noodles',
              category: 'Pasta',
              ingredients: 'Noodles, Pepper, Olive Oil, Onions',
              description: 'Noodles',
              method: 'fry noodles',
              userId: user.id
            }).then((newRecipe) => {
              chai.request(app)
              .put('/api/v1/recipes/newRecipe.id')
              .set('token', tokenone)
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
              });
            });
          });
        });
        done();
      });
      it('it should return an error if the recipe id of the recipe to be updated is not an integer', (done) => {
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const tokenone = jwt.sign(userone.get(), 'secret');
          chai.request(app)
          .put('/api/v1/recipes/Rachel')
          .set('token', tokenone)
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
          });
        });
        done();
      });
    });

    describe('/recipes DELETE endpoint', () => {
      it('it should return an error if User is not Signed in', (done) => {
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const tokenone = jwt.sign(userone.get(), 'secret');
          db.Recipe.create({
            name: 'Fried Noodles',
            category: 'Pasta',
            ingredients: 'Noodles, Pepper, Olive Oil, Onions',
            description: 'Noodles',
            method: 'fry noodles',
            userId: userone.id
          }).then((newRecipe) => {
            chai.request(app)
            .delete('/api/v1/recipes/newRecipe.id')
            .end((error, response) => {
              expect(response).to.have.status(401);
              expect(response.body.data.message).to.equal('Unauthenticated USER.');
            });
          });
        });
        done();
      });
      it('it should return an error if Recipe to be deleted is not found', (done) => {
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const tokenone = jwt.sign(userone.get(), 'secret');
          db.Recipe.create({
            name: 'Fried Noodles',
            category: 'Pasta',
            ingredients: 'Noodles, Pepper, Olive Oil, Onions',
            description: 'Noodles',
            method: 'fry noodles',
            userId: userone.id
          }).then((newRecipe) => {
            db.Recipe.destroy({where:{id:newRecipe.id}}).then(() => {
              chai.request(app)
              .delete('/api/v1/recipes/newRecip.id')
              .set('token', tokenone)
              .end((error, response) => {
                expect(response).to.have.status(404);
                expect(response.body.data.message).to.equal('Recipe not found');
              });
            });
          });
        });
        done();
      });
      it('it should return an error if recipe to be deleted is not personal recipe of the Signed in User', (done) => {
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        const anotherUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const tokenone = jwt.sign(userone.get(), 'secret');
          db.User.create(anotherUser).then((user) => {
            db.Recipe.create({
              name: 'Fried Noodles',
              category: 'Pasta',
              ingredients: 'Noodles, Pepper, Olive Oil, Onions',
              description: 'Noodles',
              method: 'fry noodles',
              userId: user.id
            }).then((newRecipe) => {
              chai.request(app)
              .delete('/api/v1/recipes/newRecipe.id')
              .set('token', tokenone)
              .end((error, response) => {
                expect(response).to.have.status(401);
                expect(response.body.data.message).to.equal('Unauthorized USER');
              });
            });
          });
        });
        done();
      });
      it('it should return an error if the recipe id of the recipe to be deleted is not an integer', (done) => {
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const tokenone = jwt.sign(userone.get(), 'secret');
          chai.request(app)
          .delete('/api/v1/recipes/Rachel')
          .set('token', tokenone)
          .end((error, response) => {
            expect(response).to.have.status(422); 
            expect(response.body.data.message).to.equal('Invalid Request');
          });
        });
        done();
      });
      it('it should delete only the personal recipe of the Signed in User', (done) => {
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const tokenone = jwt.sign(userone.get(), 'secret');
          db.Recipe.create({
            name: 'Fried Noodles',
            category: 'Pasta',
            ingredients: 'Noodles, Pepper, Olive Oil, Onions',
            description: 'Noodles',
            method: 'fry noodles',
            userId: userone.id
          }).then((newRecipe) => {
            chai.request(app)
            .delete('/api/v1/recipes/newRecipe.id')
            .set('token', tokenone)

            .end((error, response) => {
              expect(response).to.have.status(200);
              expect(response.body.data.message).to.equal('Successfully deleted recipe');
            });
          });
        });
        done();
      });
    });
      
    describe('/POST Reviews endpoint', () => {
      it('it should add a review to the recipe whose Id is specified by a Signed in User', (done) => {
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        const anotherUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const tokenone = jwt.sign(userone.get(), 'secret');
          db.User.create(anotherUser).then((user) => {
            db.Recipe.create({
              name: 'Fried Noodles',
              category: 'Pasta',
              ingredients: 'Noodles, Pepper, Olive Oil, Onions',
              description: 'Noodles',
              method: 'fry noodles',
              userId: user.id
            }).then((newRecipe) => {
              chai.request(app)
              .post('/api/v1/recipes/newRecipe.id/review')
              .set('token', tokenone)
              .send({
                review: "Awesome Stuff"
              })
              .end((error, response) => {
                expect(response).to.have.status(201);
                expect(response.body.data.review.review).to.equal('Awesome Stuff');
                expect(response.body.data.message).to.equal('Review successfully added!');

              });
            });
          });
        });
        done();
      });
      it('it should return an error if User adding a review is not Signed in', (done) => {
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const tokenone = jwt.sign(userone.get(), 'secret');
          db.Recipe.create({
            name: 'Fried Noodles',
            category: 'Pasta',
            ingredients: 'Noodles, Pepper, Olive Oil, Onions',
            description: 'Noodles',
            method: 'fry noodles',
            userId: userone.id
          }).then((newRecipe) => {
            chai.request(app)
            .post('/api/v1/recipes/newRecipe.id/review')
            .send({
              review: "Awesome Stuff"
            })
            .end((error, response) => {
              expect(response).to.have.status(401);
              expect(response.body.data.message).to.equal('Unauthenticated USER.');
            });
          });
        });
        done();
      });   
      it('it should return an error if the Id of the recipe to be reviewed does not exist', (done) => {
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        const anotherUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const tokenone = jwt.sign(userone.get(), 'secret');
          db.User.create(anotherUser).then((user) => {
            db.Recipe.create({
              name: 'Fried Noodles',
              category: 'Pasta',
              ingredients: 'Noodles, Pepper, Olive Oil, Onions',
              description: 'Noodles',
              method: 'fry noodles',
              userId: user.id
            }).then((newRecipe) => {
              db.Recipe.destroy({where:{id:newRecipe.id}}).then(() => {
                chai.request(app)
                .post('/api/v1/recipes/newRecipe.id/review')
                .set('token', tokenone)
                .send({
                  review: "Awesome Stuff"
                })

                .end((error, response) => {
                  expect(response).to.have.status(404);
                  expect(response.body.data.message).to.equal('Recipe to be reviewed not found');
                });
              });
            });
          });
        });
        done();
      });
      it('it should return an error if the Id of the recipe to be reviewed is not an integer', (done) => {
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const token = jwt.sign(userone.get(), 'secret');
          chai.request(app)
          .post('/api/v1/recipes/Rachel/review')
          .set('token', token)
          .send({
            review: "Awesome Stuff"
          })

          .end((error, response) => {
            expect(response).to.have.status(422);
            expect(response.body.data.message).to.equal('Invalid Request');
          });
        });
        done();
      });
      it('it should return an error if the Review field is empty', (done) => {
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        const anotherUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const tokenone = jwt.sign(userone.get(), 'secret');
          db.User.create(anotherUser).then((user) => {
            db.Recipe.create({
              name: 'Fried Noodles',
              category: 'Pasta',
              ingredients: 'Noodles, Pepper, Olive Oil, Onions',
              description: 'Noodles',
              method: 'fry noodles',
              userId: user.id
            }).then((newRecipe) => {
              chai.request(app)
              .post('/api/v1/recipes/newRecipe.id/review')
              .set('token', tokenone)
              .send({})

              .end((error, response) => {
                expect(response).to.have.status(422);
                expect(response.body.data.message).to.equal('Review field empty');
              });
            });
          });
        });
        done();
      });
    });
    
    describe('/POST and Retrieve Favorite Recipes Routes/', () => {
      it('should add a Recipe of a Signed In User\'s choice to that User\'s List of Favorite Recipes', (done) => {
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        const anotherUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const tokenone = jwt.sign(userone.get(), 'secret');
          db.User.create(anotherUser).then((user) => {
            db.Recipe.create({
              name: 'Fried Noodles',
              category: 'Pasta',
              ingredients: 'Noodles, Pepper, Olive Oil, Onions',
              description: 'Noodles',
              method: 'fry noodles',
              userId: user.id
            }).then((newRecipe) => {
              chai.request(app)
              .post('/api/v1/users/favorite/newRecipe.id')
              .set('token', tokenone)
              .end((error, response) => {
                expect(response).to.have.status(201);
                expect(response.body.data.message).to.equal('Recipe successfully added to Favorites!')
              });
            });
          });
        });
        done();
      });
      it('should remove a Recipe from a Signed In User\'s List of Favorite Recipes when called twice for the same Recipe', (done) => {
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        const anotherUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const tokenone = jwt.sign(userone.get(), 'secret');
          db.User.create(anotherUser).then((user) => {
            db.Recipe.create({
              name: 'Fried Noodles',
              category: 'Pasta',
              ingredients: 'Noodles, Pepper, Olive Oil, Onions',
              description: 'Noodles',
              method: 'fry noodles',
              userId: user.id
            }).then((newRecipe) => {
              chai.request(app)
              .post('/api/v1/users/favorite/newRecipe.id')
              .set('token', tokenone)
              .end((error, response) => {
                chai.request(app)
                .post('/api/v1/users/favorite/newRecipe.id')
                .set('token', tokenone)
                .end((error, response) => {

                  expect(response).to.have.status(200);
                  expect(response.body.data.message).to.equal('Successfully removed this recipe from Favorites');
                });
              });
            });
          });
        });
        done();
      });
      it('should return an error if User trying to add a recipe to his/her Favorites isn\'t signed in', (done) =>{
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        const anotherUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const tokenone = jwt.sign(userone.get(), 'secret');
          db.User.create(anotherUser).then((user) => {
            db.Recipe.create({
              name: 'Fried Noodles',
              category: 'Pasta',
              ingredients: 'Noodles, Pepper, Olive Oil, Onions',
              description: 'Noodles',
              method: 'fry noodles',
              userId: user.id
            }).then((newRecipe) => {
              chai.request(app)
              .post('/api/v1/users/favorite/newRecipe.id')
              .end((error, response) => {
                expect(response).to.have.status(401);
                expect(response.body.data.message).to.equal('Unauthenticated USER.')
              });
            });
          });
        });
        done();
      });
      it('should return an error if User is trying to add a recipe that doesn\'t exist to List of Favorites', (done) =>{
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        const anotherUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const tokenone = jwt.sign(userone.get(), 'secret');
          db.User.create(anotherUser).then((user) => {
            db.Recipe.create({
              name: 'Fried Noodles',
              category: 'Pasta',
              ingredients: 'Noodles, Pepper, Olive Oil, Onions',
              description: 'Noodles',
              method: 'fry noodles',
              userId: user.id
            }).then((newRecipe) => {
              db.Recipe.destroy({where:{id:newRecipe.id}}).then(() => {
                chai.request(app)
                .post('/api/v1/users/favorite/newRecipe.id')
                .set('token', tokenone)
                .end((error, response) => {
                  expect(response).to.have.status(404);
                  expect(response.body.data.message).to.equal('Recipe not found.')
                });
              });
            });
          });
        });
        done();
      });
      it('should return an error if User is trying to add a recipe with an ID that isn\'t an integer to List of Favorites', (done) =>{
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const tokenone = jwt.sign(userone.get(), 'secret');
          chai.request(app)
          .post('/api/v1/users/favorite/Rachel')
          .set('token', tokenone)
          .end((error, response) => {
            expect(response).to.have.status(422);
            expect(response.body.data.message).to.equal('Invalid Request.')
          });
        });
        done();
      });
      it('should return an error if User is trying to add a Personal recipe to List of Favorites', (done) =>{
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const tokenone = jwt.sign(userone.get(), 'secret');
          db.Recipe.create({
            name: 'Fried Noodles',
            category: 'Pasta',
            ingredients: 'Noodles, Pepper, Olive Oil, Onions',
            description: 'Noodles',
            method: 'fry noodles',
            userId: userone.id
          }).then((newRecipe) => {
            chai.request(app)
            .post('/api/v1/users/favorite/newRecipe.id')
            .set('token', tokenone)
            .end((error, response) => {
              expect(response).to.have.status(401);
              expect(response.body.data.message).to.equal('Unauthorized.')
            });
          });
        });
        done();
      });
      it('should return a User\'s List of Favorites', (done) =>{
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        const anotherUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const tokenone = jwt.sign(userone.get(), 'secret');
          db.User.create(anotherUser).then((user) => {
            db.Recipe.create({
              name: 'Fried Noodles',
              category: 'Pasta',
              ingredients: 'Noodles, Pepper, Olive Oil, Onions',
              description: 'Noodles',
              method: 'fry noodles',
              userId: user.id
            }).then((newRecipe) => {
              db.Favorite.create({
                userId: userone.id,
                recipeId: newRecipe.id,
              }).then(() => {
                chai.request(app)
                .get('/api/v1/users/favorites')
                .set('token', tokenone)
                .end((error, response) => {
                  expect(response).to.have.status(200);
                  expect(response.body).to.be.an('object');
                  expect(response.body.data.recipes[0].userId).to.equal(user.id);
                  expect(response.body.data.recipes[0].id).to.equal(newRecipe.id);
                });
              });
            });
          });
        });
        done();
      });
      it('should return an Error if User has no Recipe in List of Favorites', (done) =>{
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const token = jwt.sign(userone.get(), 'secret');
          chai.request(app)
          .get('/api/v1/users/favorites')
          .set('token', token)
          .end((error, response) => {
            expect(response).to.have.status(404);
            expect(response.body).to.be.an('object');
            expect(response.body.data.message).to.equal('You have no Favorite Recipes')
          });
        });
        done();
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
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        const anotherUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const token = jwt.sign(userone.get(), 'secret');
          db.User.create(anotherUser).then((user) => {
            db.Recipe.create({
              name: 'Fried Noodles',
              category: 'Pasta',
              ingredients: 'Noodles, Pepper, Olive Oil, Onions',
              description: 'Noodles',
              method: 'fry noodles',
              userId: user.id
            }).then((recipe) => {
              chai.request(app)
              .post('/api/v1/recipes/recipe.id/upvote')
              .set('token', token)
              .end((error, response) => {
                expect(response).to.have.status(201);
                expect(response.body.data.message).to.equal('Recipe Upvoted successfully')
              });
            });
          });
        });
        done();
      });
      it('should add an upvote to a Recipe and Remove Downvote if Recipe was previously Downvoted', (done) => {
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        const anotherUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const token = jwt.sign(userone.get(), 'secret');
          db.User.create(anotherUser).then((user) => {
            db.Recipe.create({
              name: 'Fried Noodles',
              category: 'Pasta',
              ingredients: 'Noodles, Pepper, Olive Oil, Onions',
              description: 'Noodles',
              method: 'fry noodles',
              userId: user.id
            }).then((recipe) => {
              chai.request(app)
              .post('/api/v1/recipes/recipe.id/downvote')
              .set('token', token)
              .end((error, response) => {
              
                chai.request(app)
                .post('/api/v1/recipes/recipe.id/upvote')
                .set('token', token)
                .end((error, response) => {
                  expect(response).to.have.status(201);
                  expect(response.body.data.message).to.equal('Recipe Upvoted successfully')
                });
              });
            });
          });
        });
        done();
      });
      it('should remove an Upvote from a Recipe when called twice for the same Recipe by the same User', (done) => {
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        const anotherUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const token = jwt.sign(userone.get(), 'secret');
          db.User.create(anotherUser).then((user) => {
            db.Recipe.create({
              name: 'Fried Noodles',
              category: 'Pasta',
              ingredients: 'Noodles, Pepper, Olive Oil, Onions',
              description: 'Noodles',
              method: 'fry noodles',
              userId: user.id
            }).then((recipe) => {
              chai.request(app)
              .post('/api/v1/recipes/recipe.id/upvote')
              .set('token', token)
              .end((error, response) => {
                chai.request(app)
                .post('/api/v1/recipes/recipe.id/upvote')
                .set('token', token)
                .end((error, response) => {
                  expect(response).to.have.status(200);
                  expect(response.body.data.message).to.equal('Successfully removed Upvote from this recipe')
                });
              });
            });
          });
        });
        done();
      });
      it('should return an error if User trying to add an upvote isn\'t Signed In', (done) =>{
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        const anotherUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const token = jwt.sign(userone.get(), 'secret');
          db.User.create(anotherUser).then((user) => {
            db.Recipe.create({
              name: 'Fried Noodles',
              category: 'Pasta',
              ingredients: 'Noodles, Pepper, Olive Oil, Onions',
              description: 'Noodles',
              method: 'fry noodles',
              userId: user.id
            }).then((recipe) => {
              chai.request(app)
              .post('/api/v1/recipes/recipe.id/upvote')
              .end((error, response) => {
                expect(response).to.have.status(401);
                expect(response.body.data.message).to.equal('Unauthenticated USER.')
              });
            });
          });
        });
        done();
      });
      it('should return an error if User is trying to add an upvote to a recipe that doesn\'t exist', (done) =>{
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        const anotherUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const token = jwt.sign(userone.get(), 'secret');
          db.User.create(anotherUser).then((user) => {
            db.Recipe.create({
              name: 'Fried Noodles',
              category: 'Pasta',
              ingredients: 'Noodles, Pepper, Olive Oil, Onions',
              description: 'Noodles',
              method: 'fry noodles',
              userId: user.id
            }).then((recipe) => {
              db.Recipe.destroy({where:{id:user.id}}).then(() => {
                chai.request(app)
                .post('/api/v1/recipes/recipe.id/upvote')
                .set('token', token)
                .end((error, response) => {
                  expect(response).to.have.status(404);
                  expect(response.body.data.message).to.equal('Recipe not found.')
                });
              });
            });
          });
        });
        done();
      });
      it('should return an error if User is trying to Upvote a recipe with an ID that isn\'t an integer', (done) =>{
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const token = jwt.sign(userone.get(), 'secret');
          chai.request(app)
          .post('/api/v1/recipes/Rachel/upvote')
          .set('token', token)
          .end((error, response) => {
            expect(response).to.have.status(422);
            expect(response.body.data.message).to.equal('Invalid Request.')
          });
        });
        done();
      });
      it('should return an error if User is trying to add an Upvote to a Personal recipe', (done) =>{
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const token = jwt.sign(userone.get(), 'secret');
          db.Recipe.create({
            name: 'Fried Noodles',
            category: 'Pasta',
            ingredients: 'Noodles, Pepper, Olive Oil, Onions',
            description: 'Noodles',
            method: 'fry noodles',
            userId: userone.id
          }).then((recipe) => {
            chai.request(app)
            .post('/api/v1/recipes/recipe.id/upvote')
            .set('token', token)
            .end((error, response) => {
              expect(response).to.have.status(401);
              expect(response.body.data.message).to.equal('Unauthorized.')
            });
          });
        });
        done();
      });
    });
  
    describe('/POST DOWNVOTES to Recipes/', () => {
      it('should add a Downvote to a Recipe when called by a Signed in User', (done) => {
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        const anotherUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const token = jwt.sign(userone.get(), 'secret');
          db.User.create(anotherUser).then((user) => {
            db.Recipe.create({
              name: 'Fried Noodles',
              category: 'Pasta',
              ingredients: 'Noodles, Pepper, Olive Oil, Onions',
              description: 'Noodles',
              method: 'fry noodles',
              userId: user.id
            }).then((recipe) => {
              chai.request(app)
              .post('/api/v1/recipes/recipe.id/downvote')
              .set('token', token)
              .end((error, response) => {
                expect(response).to.have.status(201);
                expect(response.body.data.message).to.equal('Recipe Downpvoted successfully')
              });
            });
          });
        });
        done();
      });
      it('should add a Downvote to a Recipe and Remove Upvote if Recipe was previously Upvoted', (done) => {
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        const anotherUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const token = jwt.sign(userone.get(), 'secret');
          db.User.create(anotherUser).then((user) => {
            db.Recipe.create({
              name: 'Fried Noodles',
              category: 'Pasta',
              ingredients: 'Noodles, Pepper, Olive Oil, Onions',
              description: 'Noodles',
              method: 'fry noodles',
              userId: user.id
            }).then((recipe) => {
              chai.request(app)
              .post('/api/v1/recipes/recipe.id/upvote')
              .set('token', token)
              .end((error, response) => {
              
                chai.request(app)
                .post('/api/v1/recipes/recipe.id/downvote')
                .set('token', token)
                .end((error, response) => {
                  expect(response).to.have.status(201);
                  expect(response.body.data.message).to.equal('Recipe Downvoted successfully')
                });
              });
            });
          });
        });
        done();
      });
      it('should remove a downvote from a Recipe when called twice for the same Recipe by the same User', (done) => {
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        const anotherUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const token = jwt.sign(userone.get(), 'secret');
          db.User.create(anotherUser).then((user) => {
            db.Recipe.create({
              name: 'Fried Noodles',
              category: 'Pasta',
              ingredients: 'Noodles, Pepper, Olive Oil, Onions',
              description: 'Noodles',
              method: 'fry noodles',
              userId: user.id
            }).then((recipe) => {
              chai.request(app)
              .post('/api/v1/recipes/recipe.id/downvote')
              .set('token', token)
              .end((error, response) => {
                chai.request(app)
                .post('/api/v1/recipes/recipe.id/downvote')
                .set('token', token)
                .end((error, response) => {
                  expect(response).to.have.status(200);
                  expect(response.body.data.message).to.equal('Successfully removed Downvote from this recipe')
                });
              });
            });
          });
        });
        done();
      });
      it('should return an error if User trying to add a downvote isn\'t Signed In', (done) =>{
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        const anotherUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const token = jwt.sign(userone.get(), 'secret');
          db.User.create(anotherUser).then((user) => {
            db.Recipe.create({
              name: 'Fried Noodles',
              category: 'Pasta',
              ingredients: 'Noodles, Pepper, Olive Oil, Onions',
              description: 'Noodles',
              method: 'fry noodles',
              userId: user.id
            }).then((recipe) => {
              chai.request(app)
              .post('/api/v1/recipes/recipe.id/downvote')
              .end((error, response) => {
                expect(response).to.have.status(401);
                expect(response.body.data.message).to.equal('Unauthenticated USER.')
              });
            });
          });
        });
        done();
      });
      it('should return an error if User is trying to add a downvote to a recipe that doesn\'t exist', (done) =>{
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        const anotherUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const token = jwt.sign(userone.get(), 'secret');
          db.User.create(anotherUser).then((user) => {
            db.Recipe.create({
              name: 'Fried Noodles',
              category: 'Pasta',
              ingredients: 'Noodles, Pepper, Olive Oil, Onions',
              description: 'Noodles',
              method: 'fry noodles',
              userId: user.id
            }).then((recipe) => {
              db.Recipe.destroy({where:{id:user.id}}).then(() => {
                chai.request(app)
                .post('/api/v1/recipes/recipe.id/downvote')
                .set('token', token)
                .end((error, response) => {
                  expect(response).to.have.status(404);
                  expect(response.body.data.message).to.equal('Recipe not found.')
                });
              });
            });
          });
        });
        done();
      });
      it('should return an error if User is trying to downvote a recipe with an ID that isn\'t an integer', (done) =>{
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const token = jwt.sign(userone.get(), 'secret');
          chai.request(app)
          .post('/api/v1/recipes/Rachel/downvote')
          .set('token', token)
          .end((error, response) => {
            expect(response).to.have.status(422);
            expect(response.body.data.message).to.equal('Invalid Request.')
          });
        });
        done();
      });
      it('should return an error if User is trying to add a Downvote to a Personal recipe', (done) =>{
        const thisUser = {
          Firstname: faker.name.firstName(),
          Lastname: faker.name.lastName(),
          Username: faker.internet.userName(),
          Email: faker.internet.email(),
          Password: bcrypt.hashSync(faker.internet.password(), 10)
        };
        db.User.create(thisUser).then((userone) => {
          const token = jwt.sign(userone.get(), 'secret');
          db.Recipe.create({
            name: 'Fried Noodles',
            category: 'Pasta',
            ingredients: 'Noodles, Pepper, Olive Oil, Onions',
            description: 'Noodles',
            method: 'fry noodles',
            userId: userone.id
          }).then((recipe) => {
            chai.request(app)
            .post('/api/v1/recipes/recipe.id/downvote')
            .set('token', token)
            .end((error, response) => {
              expect(response).to.have.status(401);
              expect(response.body.data.message).to.equal('Unauthorized.')
            });
          });
        });
        done();
      });
    });
  });
});
