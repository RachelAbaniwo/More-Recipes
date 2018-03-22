import db from '../models';
import { checkField, returnParameter } from '../helpers/checkInput';
import pagination from '../helpers/pagination';

const { Recipe, User } = db;

/**
 * Controls the recipes endpoints
 * @class RecipesController
 */
export default class RecipesController {
  /**
   * gets all recipes in the database
   * @function getRecipes
   *
   * @param {object} request request to get all recipes
   * @param {object} response contains array of recipes or error
   *
   * @returns {json} returns array of recipes or error
   */
  getRecipes(request, response) {
    const limit = request.query.limit || 6;
    const offset = request.query.offset || 0;
    const operator = db.Sequelize.Op;
    const { search } = request.query;
    const searchQuery = search ? search.trim() : '';
    if (request.query.sort && request.query.search) {
      return Recipe.findAndCountAll({
        limit,
        offset,
        distinct: true,
        group: ['Recipe.id', 'User.id'],
        order: db.sequelize.literal(`max(${request.query.sort}) DESC`),
        include: [{ model: User, attributes: { exclude: ['password'] } }],
        where: {
          [operator.or]: {
            name: {
              [operator.iLike]: `%${searchQuery}%`
            },
            description: {
              [operator.iLike]: `%${searchQuery}%`
            },
            ingredients: {
              [operator.iLike]: `%${searchQuery}%`
            }
          }
        }
      }).then(({ rows: recipes, count }) => {
        if (recipes.length === 0) {
          return response.status(404).json({
            message: 'Recipe not found'
          });
        }
        return response.status(200).json({
          recipes,
          pageData: pagination(count.length, limit, offset),
        });
      }).catch(error => response.status(500).json({
        message: error.message
      }));
    }
    if (request.query.sort) {
      return Recipe.findAndCountAll({
        limit,
        offset,
        distinct: true,
        group: ['Recipe.id', 'User.id'],
        order: db.sequelize.literal(`max(${request.query.sort}) DESC`),
        include: [{ model: User, attributes: { exclude: ['password'] } }],
      }).then(({ rows: recipes, count }) => {
        if (recipes.length === 0) {
          return response.status(404).json({
            message: 'Recipe not found'
          });
        }
        return response.status(200).json({
          recipes,
          pageData: pagination(count.length, limit, offset),
        });
      }).catch(error => response.status(500).json({
        message: error.message
      }));
    } else if (request.query.search) {
      return Recipe.findAndCountAll({
        limit,
        offset,
        distinct: true,
        include: [{ all: true, attributes: { exclude: ['password'] }, nested: true }],
        where: {
          [operator.or]: {
            name: {
              [operator.iLike]: `%${searchQuery}%`
            },
            description: {
              [operator.iLike]: `%${searchQuery}%`
            },
            ingredients: {
              [operator.iLike]: `%${searchQuery}%`
            }
          }
        }
      }).then(({ rows: recipes, count }) => {
        if (recipes.length === 0) {
          return response.status(404).json({
            message: 'Recipe not found'
          });
        }
        return response.status(200).json({
          recipes,
          pageData: pagination(count, limit, offset),
        });
      }).catch(error => response.status(500).json({
        message: error.message
      }));
    }
    return Recipe.findAndCountAll({
      limit,
      offset,
      distinct: true,
      include: [{ all: true, attributes: { exclude: ['password'] }, nested: true }]
    }).then(({ rows: recipes, count }) => {
      response.status(200).json({
        recipes,
        pageData: pagination(count, limit, offset),
      });
    }).catch(error => response.status(500).json({
      message: error.message
    }));
  }

  /**
   * gets a recipe by its id
   * @function getOneRecipe
   *
   * @param {object} request rrequest from user
   * @param {object} response recipe object or error message
   *
   * @returns {json} recipe or error message returned
   */
  getOneRecipe(request, response) {
    Recipe.findById(request.params.recipeId, {
      include: [{ all: true, attributes: { exclude: ['password'] }, nested: true }]
    }).then((recipe) => {
      if (!recipe) {
        return response.status(404).json({
          message: 'Recipe not found'
        });
      }
      return response.status(200).json({
        recipe
      });
    }).catch(() => response.status(400).json({
      message: 'Invalid request'
    }));
  }
  /**
   * creates a new recipe
   * @function addRecipes
   *
   * @param {object} request request from user
   * @param {object} response created recipe or error message
   *
   * @returns {json} returns created recipe or error message
   */
  addRecipes(request, response) {
    const errors = [];

    if ((!request.body.name) || (checkField(request.body.name))) {
      errors.push('Recipe Name is required.');
    }
    if ((!request.body.category) || (checkField(request.body.category))) {
      errors.push('Recipe Category is required.');
    }
    if ((!request.body.ingredients) || (checkField(request.body.ingredients))) {
      errors.push('Recipe Ingredients are required.');
    }
    if ((!request.body.description) || (checkField(request.body.description))) {
      errors.push('Recipe Description is required.');
    }
    if ((!request.body.method) || (checkField(request.body.method))) {
      errors.push('Method required.');
    }
    if (!request.body.imageUrl) {
      errors.push('Recipe Image is required.');
    }

    if (errors.length > 0) {
      return response.status(400).json({
        errors,
        message: 'Please fill all fields'
      });
    }

    return Recipe.create({
      name: request.body.name,
      category: request.body.category,
      description: request.body.description,
      method: request.body.method,
      ingredients: request.body.ingredients,
      userId: request.AuthUser.id,
      recipeImage: request.body.imageUrl
    }).then(recipe => response.status(201).json({
      recipe,
      message: 'Successfully created recipe'
    }))
      .catch(error => response.status(500).json({
        message: error.message
      }));
  }
  /**
   * updates a recipe
   * @function updateRecipe
   *
   * @param {object} request recipe to be updated
   * @param {object} response updated recipe
   *
   * @returns {json} updated recipe or error message returned
   */
  updateRecipe(request, response) {
    Recipe.findById(request.params.recipeId).then((recipe) => {
      Recipe.update({
        name: returnParameter(request.body.name) || recipe.name,
        category: returnParameter(request.body.category) || recipe.category,
        description:
        returnParameter(request.body.description) || recipe.description,
        method: returnParameter(request.body.method) || recipe.method,
        ingredients:
        returnParameter(request.body.ingredients) || recipe.ingredients,
        recipeImage: request.body.imageUrl || recipe.recipeImage
      }, {
        where: { id: request.params.recipeId },
        returning: true,
        plain: true
      })
        .then((newRecipe) => {
          const updatedRecipe = {
            name: newRecipe[1].name,
            category: newRecipe[1].category,
            description: newRecipe[1].description,
            method: newRecipe[1].method,
            ingredients: newRecipe[1].ingredients,
            id: newRecipe[1].id,
            userId: newRecipe[1].userId,
            recipeImage: newRecipe[1].imageUrl

          };
          response.status(201).json({
            recipe: updatedRecipe, message: 'Successfully updated recipe'
          });
        }).catch(error => response.status(500).json({
          message: error.message
        }));
    }).catch(error => response.status(500).json({
      message: error.message
    }));
  }
  /**
   * deletes a recipe
   * @function deleteRecipe
   *
   * @param {object} request recipe to be deleted
   * @param {object} response message or error
   *
   * @returns {json} returns success or error message
   */
  deleteRecipe(request, response) {
    return Recipe.findById(request.params.recipeId).then((recipe) => {
      recipe.destroy().then(() => response.status(200).json({
        message: 'Successfully deleted recipe'
      }))
        .catch(error => response.status(500).json({
          message: error.message
        }));
    });
  }
}
