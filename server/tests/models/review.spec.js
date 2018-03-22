/* eslint-disable */
import chai from 'chai';
import models from '../../models';

const { Review } = models;


const expect = chai.expect;


describe('Review model', () => {
  before((done) => {
    Review.destroy({ where: {} }).then(() => {
      done();
    });
  });
  it('should create review', (done) => {
    Review.create({
      recipeId: 4,
      userId: 1,
      review: 'newReview'
    })
      .then((review) => {
        expect(review).to.be.an('object');
        expect(review.recipeId).to.equal(4);
        expect(review.userId).to.equal(1);
        expect(review.review).to.equal('newReview');
        done();
      });
  });
  it('should destroy the review specified by ID', (done) => {
    Review.create({
      recipeId: 4,
      userId: 2,
      review: 'newReview'
    })
      .then((review) => {
        expect(review.recipeId).to.equal(4);
        expect(review.userId).to.equal(2);
        expect(review.review).to.equal('newReview')
        const { id } = review;
        Review.destroy({
          where: { id }
        }).then(() => {
          Review.findById(id).then(deletedReview => {
            expect(deletedReview).to.be.null;
            done();
          });
        });
     });
   });
});