import db from '../models';
import { checkField, returnParameter } from '../helpers/checkInput';
import pagination from '../helpers/pagination';

const { Recipe, User } = db;

/**
 * Controls the recipes endpoints
 */
export default class RecipesController {
  /**
   * gets all recipes in the database
   * @param {object} req request to get all recipes
   * @param {object} res array of recipes or error
   * @returns {json} returns array of recipes or error
   */
  getRecipes(req, res) {
    const limit = req.query.limit || 6;
    const offset = req.query.offset || 0;
    const op = db.Sequelize.Op;
    const { search } = req.query;
    const searchQuery = search ? search.trim() : '';
    if (req.query.sort && req.query.search) {
      return Recipe.findAndCountAll({
        limit,
        offset,
        group: ['Recipe.id', 'User.id'],
        order: db.sequelize.literal(`max(${req.query.sort}) DESC`),
        include: [{ model: User, attributes: { exclude: ['password'] } }],
        where: {
          [op.or]: {
            name: {
              [op.iLike]: `%${searchQuery}%`
            },
            description: {
              [op.iLike]: `%${searchQuery}%`
            },
            ingredients: {
              [op.iLike]: `%${searchQuery}%`
            }
          }
        }
      }).then(({ rows: recipes, count }) => {
        if (recipes.length === 0) {
          return res.status(404).json({
            message: 'Recipe not found'
          });
        }
        return res.status(200).json({
          recipes,
          pageData: pagination(count.length, limit, offset),
        });
      }).catch(error => res.status(500).json({
        message: error.message
      }));
    }
    if (req.query.sort) {
      return Recipe.findAndCountAll({
        limit,
        offset,
        group: ['Recipe.id', 'User.id'],
        order: db.sequelize.literal(`max(${req.query.sort}) DESC`),
        include: [{ model: User, attributes: { exclude: ['password'] } }],
      }).then(({ rows: recipes, count }) => {
        if (recipes.length === 0) {
          return res.status(404).json({
            message: 'Recipe not found'
          });
        }
        return res.status(200).json({
          recipes,
          pageData: pagination(count.length, limit, offset),
        });
      }).catch(error => res.status(500).json({
        message: error.message
      }));
    } else if (req.query.search) {
      return Recipe.findAndCountAll({
        limit,
        offset,
        distinct: true,
        include: [{ all: true, attributes: { exclude: ['password'] }, nested: true }],
        where: {
          [op.or]: {
            name: {
              [op.iLike]: `%${searchQuery}%`
            },
            description: {
              [op.iLike]: `%${searchQuery}%`
            },
            ingredients: {
              [op.iLike]: `%${searchQuery}%`
            }
          }
        }
      }).then(({ rows: recipes, count }) => {
        if (recipes.length === 0) {
          return res.status(404).json({
            message: 'Recipe not found'
          });
        }
        return res.status(200).json({
          recipes,
          pageData: pagination(count, limit, offset),
        });
      }).catch(error => res.status(500).json({
        message: error.message
      }));
    }
    return Recipe.findAndCountAll({
      limit,
      offset,
      include: [{ all: true, attributes: { exclude: ['password'] }, nested: true }]
    }).then(({ rows: recipes, count }) => {
      res.status(200).json({
        recipes,
        pageData: pagination(count, limit, offset),
      });
    }).catch(error => res.status(500).json({
      message: error.message
    }));
  }

  /**
   * gets a recipe by its id
   * @param {object} req recipe object
   * @param {object} res recipe object
   * @returns {json} recipe returned
   */
  getOneRecipe(req, res) {
    Recipe.findById(req.params.recipeId, {
      include: [{ all: true, attributes: { exclude: ['password'] }, nested: true }]
    }).then((recipe) => {
      if (!recipe) {
        return res.status(404).json({
          message: 'Recipe not found'
        });
      }
      return res.status(200).json({
        recipe
      });
    }).catch(() => res.status(400).json({
      message: 'Invalid request'
    }));
  }
  /**
   * creates a new recipe
   * @param {object} req request from user
   * @param {object} res created recipe or error
   * @returns {json} returns created object or error message
   */
  addRecipes(req, res) {
    const errors = [];

    if ((!req.body.name) || (checkField(req.body.name))) {
      errors.push('Recipe Name is required.');
    }
    if ((!req.body.category) || (checkField(req.body.category))) {
      errors.push('Recipe Category is required.');
    }
    if ((!req.body.ingredients) || (checkField(req.body.ingredients))) {
      errors.push('Recipe Ingredients are required.');
    }
    if ((!req.body.description) || (checkField(req.body.description))) {
      errors.push('Recipe Description is required.');
    }
    if ((!req.body.method) || (checkField(req.body.method))) {
      errors.push('Method required.');
    }
    if (!req.body.imageUrl) {
      errors.push('Recipe Image is required.');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        errors,
        message: 'Please fill all fields'
      });
    }

    return Recipe.create({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      method: req.body.method,
      ingredients: req.body.ingredients,
      userId: req.AuthUser.id,
      recipeImage: req.body.imageUrl
    }).then(recipe => res.status(201).json({
      recipe,
      message: 'Successfully created recipe'
    }))
      .catch(error => res.status(500).json({
        message: error.message
      }));
  }
  /**
   * updates a recipe
   * @param {object} req recipe to be updated
   * @param {object} res updated recipe
   * @returns {json} updated recipe returned
   */
  updateRecipe(req, res) {
    Recipe.findById(req.params.recipeId).then((recipe) => {
      Recipe.update({
        name: returnParameter(req.body.name) || recipe.name,
        category: returnParameter(req.body.category) || recipe.category,
        description: returnParameter(req.body.description) || recipe.description,
        method: returnParameter(req.body.method) || recipe.method,
        ingredients: returnParameter(req.body.ingredients) || recipe.ingredients,
        recipeImage: req.body.imageUrl || recipe.recipeImage
      }, {
        where: { id: req.params.recipeId },
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
          res.status(201).json({
            recipe: updatedRecipe, message: 'Successfully updated recipe'
          });
        }).catch(error => res.status(500).json({
          message: error.message
        }));
    }).catch(error => res.status(500).json({
      message: error.message
    }));
  }
  /**
   * deletes a recipe
   * @param {object} req recipe to be deleted
   * @param {object} res message or error
   * @returns {json} returns message
   */
  deleteRecipe(req, res) {
    return Recipe.findById(req.params.recipeId).then((recipe) => {
      recipe.destroy().then(() => res.status(200).json({
        message: 'Successfully deleted recipe'
      }))
        .catch(error => res.status(500).json({
          message: error.message
        }));
    });
  }
}
