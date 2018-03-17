/* eslint-disable */
import chai from 'chai';
import models from '../../models';

const { Recipe } = models;


const expect = chai.expect;


describe('Recipe model', () => {
  it('should create a new recipe if all fields are appropriately filled', (done) => {
    Recipe.create({
      name: 'name',
      category: 'category',
      description: 'description',
      method: 'method',
      ingredients: 'ingredients'
    })
      .then((recipe) => {
        expect(recipe.name).to.equal('name');
        expect(recipe.description).to.equal('description');
        expect(recipe.category).to.equal('category');
        done();
      });
  });
  it('should update the recipe specified by ID', (done) => {
    Recipe.create({
      name: 'newName',
      category: 'newCategory',
      description: 'newDescription',
      method: 'newMethod',
      ingredients: 'newIngredients'
    })
      .then((recipe) => {
        expect(recipe.name).to.equal('newName');
        expect(recipe.category).to.equal('newCategory');
        expect(recipe.description).to.equal('newDescription');
        const { id } = recipe
        Recipe.findById(id).then((recipe) => {
          recipe.update({
            name: 'updatedName'
          }).then(() => {
            expect(recipe.dataValues.name).to.equal('updatedName');
            done();
          });
        });
      });
    });
  it('should destroy the recipe specified by ID', (done) => {
    Recipe.create({
      name: 'recipeName',
      category: 'recipeCategory',
      description: 'recipeDescription',
      method: 'recipeMethod',
      ingredients: 'recipeIngredients'
    })
      .then((recipe) => {
        expect(recipe.name).to.equal('recipeName');
        expect(recipe.category).to.equal('recipeCategory');
        expect(recipe.description).to.equal('recipeDescription');
        const { id } = recipe
        Recipe.destroy({
          where: { id }
        }).then(() => {
          Recipe.findById(id).then(deletedRecipe => {
            expect(deletedRecipe).to.be.null;
            done();
          });
        });
      });
   });
});
