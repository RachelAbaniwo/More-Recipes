/* eslint-disable */
import chai from 'chai';
import models from '../../models';

const { Token } = models;


const expect = chai.expect;


describe('Token model', () => {
  before((done) => {
    Token.destroy({ where: {} }).then(() => {
      done();
    });
  });
  it('should create token', (done) => {
    Token.create({
      token: 'token'
    })
      .then((token) => {
        expect(token).to.be.an('object');
        expect(token.token).to.equal('token');
        done();
      });
  });
  it('should destroy the token specified by ID', (done) => {
    Token.create({
      token: 'token'
    })
      .then((token) => {
        expect(token.token).to.equal('token');
        const { id } = token;
        Token.destroy({
          where: { id }
        }).then(() => {
          Token.findById(id).then(deletedToken => {
            expect(deletedToken).to.be.null;
            done();
          });
        });
     });
   });
});