import db from '../models';

/**
 * Controls the favorites endpoints
 */
export default class FavoritesController {
/**
 * adds User's Favorite recipes to database
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} json returned to client
 */
  async addFavorite(req, res) {
    const query = { where: { userId: req.AuthUser.id, recipeId: req.params.recipeId } };
    const favorite = await db.Favorite.findOne(query);

    if (favorite) {
      await favorite.destroy();
      return res.status(200).json({
        message: 'Successfully removed this recipe from Favorites'
      });
    }

    await db.Favorite.create({
      userId: req.AuthUser.id,
      recipeId: req.params.recipeId
    });
    const recipe = req.FavoriteRecipe;
    return res.status(201).json({
      recipe, message: 'Recipe successfully added to Favorites!'
    });
  }
  /**
   * gets User's Favorite recipes from database
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json returned to client
   */
  async getFavorites(req, res) {
    try {
      const query = { where: { userId: req.AuthUser.id } };
      const favorites = await db.Favorite.findAll(query);

      if (favorites.length < 1) {
        return res.status(404).json({
          message: 'You have no Favorite Recipes'
        });
      }
      const recipeIds = favorites.map(favorite => favorite.recipeId);
      const nextQuery = { where: { id: { [db.Sequelize.Op.in]: recipeIds } } };
      const recipes = await db.Recipe.findAll(nextQuery);
      return res.status(200).json({
        recipes
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }
  /**
     * deletes a user from database
     * @param {object} req request object
     * @param {object} res response object
     * @returns {json} json returns message to client
     */
  deleteFavorite(req, res) {
    return db.Favorite.findById(req.params.favoriteId).then((favorite) => {
      favorite.destroy().then(() => res.status(200).json({
        message: 'Successfully deleted this recipe from your favorites'
      }))
        .catch(error => res.status(500).json({
          message: error.message
        }));
    });
  }
}

