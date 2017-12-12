/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../../models/index'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import app from '../../app';
import data from '../mock-data'

const expect = chai.expect;

const { signinUser1, signinUser2, wrongUsername, 
       wrongPassword, signupUser, emailInUseSignUp,
       usernameInUseSignUp, wrongEmailFormat } = data;

chai.use(chaiHttp);

describe('/USER CONTROLLER', () => {
    
     describe('/User Sign up/', () => {
       it('should Register a New User', (done) => {
         chai.request(app)
         .post('/api/v1/users/signup')
         .send({signupUser})
         .end((error, response) => {
             expect(response).to.have.status(201);
             expect(response.body).to.have.property('token');
             expect(response.body).to.have.property('createdUser');
             expect(response.body.message).to.equal('Successfully signed up!');
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
   