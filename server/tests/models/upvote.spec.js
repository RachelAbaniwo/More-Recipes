/* eslint-disable */
import chai from 'chai';
import models from '../../models';

const { Upvote } = models;


const expect = chai.expect;


describe('Upvotes model', () => {
  before((done) => {
    Upvote.destroy({ where: {} }).then(() => {
      done();
    });
  });
  it('should create upvotes', (done) => {
    Upvote.create({
      recipeId: 4,
      userId: 1
    })
      .then((upvote) => {
        expect(upvote).to.be.an('object');
        expect(upvote.recipeId).to.equal(4);
        expect(upvote.userId).to.equal(1);
        done();
      });
  });
  it('should destroy the upvote specified by ID', (done) => {
    Upvote.create({
      recipeId: 4,
      userId: 2
    })
      .then((upvote) => {
        expect(upvote).to.be.an('object');
        expect(upvote.recipeId).to.equal(4);
        expect(upvote.userId).to.equal(2);
        const { id } = upvote;
        Upvote.destroy({
          where: { id }
        }).then(() => {
          Upvote.findById(id).then(deletedUpvote => {
            expect(deletedUpvote).to.be.null;
            done();
          });
        });
     });
   });
});
