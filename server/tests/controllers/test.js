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
