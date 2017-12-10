import db from '../models';

/**
 * Controls the recipes endpoints
 */
export default class RecipesController {
  /**
   * gets all recipes in the database
   * @param {object} req request object
   * @param {object} res response object
   * @returns {json} json returned to client
   */
  getRecipes(req, res) {
    return db.Recipe.findAll({
      //  include: { model: db.User }
    }).then(recipes => res.status(200).json({
      recipes
    }))
      .catch(error => res.status(500).json({
        message: error.message
      }));
  }
  /**
   * gets a recipe by its id
   * @param {object} req request object
   * @param {object} res response object
   * @returns {json} json returned to client
   */
  getOneRecipe(req, res) {
    db.Recipe.findById(req.params.recipeId).then((recipe) => {
      if (!recipe) {
        return res.status(404).json({
          message: 'Recipe not found'
        });
      }
      return res.status(200).json({
        recipe
      });
    }).catch(() => res.status(422).json({
      message: 'Invalid Request'
    }));
  }
  /**
   * gets a user's personal recipes from database
   * @param {object} req request object
   * @param {object} res response object
   * @returns {json} json returned to client
   */
  getMyRecipes(req, res) {
    db.Recipe.findAll({ where: { userId: req.AuthUser.id } }).then((recipes) => {
      if (recipes.length < 1) {
        return res.status(404).json({
          message: 'You have no Recipes'
        });
      } res.status(200).json({
        recipes
      });
    }).catch(error =>
      res.status(500).json({
        message: error.message
      }));
  }
  /**
   * gets any user's recipes by the user's id
   * @param {object} req request object
   * @param {object} res response object
   * @returns {json} json returned to client
   */
  getUserRecipes(req, res) {
    db.Recipe.findAll({ where: { userId: req.params.userId } }).then((recipes) => {
      if (recipes.length < 1) {
        return res.status(404).json({
          message: 'User has no Recipes'
        });
      } res.status(200).json({
        recipes
      });
    }).catch(() =>
      res.status(422).json({
        message: 'Invalid Request'
      }));
  }
  /**
   * creates a new recipe
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json returned to client
   */
  addRecipes(req, res) {
    const errors = [];

    if (!req.body.name) {
      errors.push('Recipe Name is required.');
    }
    if (!req.body.category) {
      errors.push('Recipe Category is required.');
    }
    if (!req.body.ingredients) {
      errors.push('Recipe Ingredients are required.');
    }
    if (!req.body.description) {
      errors.push('Recipe Description is required.');
    }
    if (!req.body.method) {
      errors.push('Method required.');
    }

    if (errors.length > 0) {
      return res.status(422).json({
        errors,
        message: 'Please fill all Fields'
      });
    }

    return db.Recipe.create({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      method: req.body.method,
      ingredients: req.body.ingredients,
      userId: req.AuthUser.id
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
   * @param {object} req request object
   * @param {object} res response object
   * @returns {json} json returned to client
   */
  updateRecipe(req, res) {
    return db.Recipe.update({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      method: req.body.method,
      ingredients: req.body.ingredients,
    }, {
      where: { id: req.params.recipeId },
      returning: true,
      plain: true
    })
      .then(recipe => res.status(201).json({
        recipe, message: 'Successfully updated recipe'
      }))
      .catch(error => res.status(500).json({
        message: error.message
      }));
  }
  /**
   * deletes a recipe
   * @param {object} req request object
   * @param {object} res response object
   * @returns {json} json returns message to client
   */
  deleteRecipe(req, res) {
    return db.Recipe.findById(req.params.recipeId).then((recipe) => {
      recipe.destroy().then(() => res.status(200).json({
        message: 'Successfully deleted recipe'
      }))
        .catch(error => res.status(500).json({
          message: error.message
        }));
    });
  }
}
