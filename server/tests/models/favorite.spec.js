/* eslint-disable */
import chai from 'chai';
import models from '../../models';

const { Favorite } = models;


const expect = chai.expect;


describe('Favorite model', () => {
  before((done) => {
    Favorite.destroy({ where: {} }).then(() => {
      done();
    });
  });
  it('should create favorite', (done) => {
    Favorite.create({
      recipeId: 4,
      userId: 1
    })
      .then((favorite) => {
        expect(favorite).to.be.an('object');
        expect(favorite.recipeId).to.equal(4);
        expect(favorite.userId).to.equal(1);
        done();
      });
  });
  it('should destroy the favorite specified by ID', (done) => {
    Favorite.create({
      recipeId: 4,
      userId: 2
    })
      .then((favorite) => {
        expect(favorite).to.be.an('object');
        expect(favorite.recipeId).to.equal(4);
        expect(favorite.userId).to.equal(2);
        const { id } = favorite;
        Favorite.destroy({
          where: { id }
        }).then(() => {
          Favorite.findById(id).then(deletedFavorite => {
            expect(deletedFavorite).to.be.null;
            done();
          });
        });
     });
   });
});