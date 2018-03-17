/* eslint-disable */
import chai from 'chai';
import models from '../../models';

const { User } = models;


const expect = chai.expect;


describe('User model', () => {
  it('should create a new user if all fields are appropriately filled', (done) => {
    User.create({
      firstname: 'firstname',
      lastname: 'lastname',
      username: 'username',
      email: 'newtest@test.com',
      password: 'password'
    })
      .then((user) => {
        expect(user.firstname).to.equal('firstname');
        expect(user.lastname).to.equal('lastname');
        expect(user.email).to.equal('newtest@test.com');
        done();
      });
  });
  it('should return an error if the email filled has been used before', (done) => {
    User.create({
      firstname: 'name',
      lastname: 'name',
      username: 'name',
      email: 'est@test.com',
      password: 'password'
    })
      .then((user) => {
        expect(user.firstname).to.equal('name');
        expect(user.lastname).to.equal('name');
        expect(user.email).to.equal('est@test.com');
        User.create({
          firstname: 'firstname',
          lastname: 'lastname',
          username: 'newusername',
          email: 'est@test.com',
          password: 'password'
        }).catch((error) => {
          expect(error.errors[0].type).to.equal('unique violation');
          expect(error.errors[0].message).to.equal('The Email already exists.');
          expect(error.errors[0].path).to.equal('email');
          expect(error.errors[0].value).to.equal('est@test.com');
          done();
        });
      });
  });
  it('should return an error if the email filled is not valid', (done) => {
    User.create({
      firstname: 'name',
      lastname: 'name',
      username: 'namename',
      email: 'testtest.com',
      password: 'password'
    })
      .catch((error) => {
        expect(error.errors[0].type).to.equal('Validation error');
        expect(error.errors[0].message).to.equal('The Email entered is invalid');
        expect(error.errors[0].path).to.equal('email');
        expect(error.errors[0].value).to.equal('testtest.com');
        done();
        
      });
  });
  it('should return errors if necessary fields are not filled', (done) => {
    User.create({
      email: 'test@test.com',
      password: 'password'
    })
      .catch((error) => {
        expect(error.errors[0].type).to.equal('notNull Violation');
        expect(error.errors[1].type).to.equal('notNull Violation');
        expect(error.errors[0].message).to.equal('User.firstname cannot be null');
        expect(error.errors[1].message).to.equal('User.lastname cannot be null');
        expect(error.errors[0].value).to.equal(null);
        done();
      });
  });
  it('should destroy the user specified by ID', (done) => {
    User.create({
      firstname: 'newfirstname',
      lastname: 'newlasttname',
      username: 'newUsername',
      email: 'email@test.com',
      password: 'password'
    })
      .then((user) => {
        expect(user.firstname).to.equal('newfirstname');
        expect(user.lastname).to.equal('newlasttname');
        expect(user.email).to.equal('email@test.com');
        const { id } = user
        User.destroy({
          where: { id }
        }).then(() => {
          User.findById(id).then(deletedUser => {
            expect(deletedUser).to.be.null;
            done();
          });
        });
      });
   });
});
