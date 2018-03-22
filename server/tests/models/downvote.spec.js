/* eslint-disable */
import chai from 'chai';
import models from '../../models';

const { Downvote } = models;


const expect = chai.expect;


describe('Downvotes model', () => {
  before((done) => {
    Downvote.destroy({ where: {} }).then(() => {
      done();
    });
  });
  it('should create downvotes', (done) => {
    Downvote.create({
      recipeId: 4,
      userId: 1
    })
      .then((downvote) => {
        expect(downvote).to.be.an('object');
        expect(downvote.recipeId).to.equal(4);
        expect(downvote.userId).to.equal(1);
        done();
      });
  });
  it('should destroy the downvote specified by ID', (done) => {
    Downvote.create({
      recipeId: 4,
      userId: 2
    })
      .then((downvote) => {
        expect(downvote).to.be.an('object');
        expect(downvote.recipeId).to.equal(4);
        expect(downvote.userId).to.equal(2);
        const { id } = downvote;
        Downvote.destroy({
          where: { id }
        }).then(() => {
          Downvote.findById(id).then(deletedDownvote => {
            expect(deletedDownvote).to.be.null;
            done();
          });
        });
     });
   });
});
