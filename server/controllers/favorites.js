import db from '../models';

const { Favorite, Recipe } = db;
/**
 * Controls the favorites endpoints
 */
export default class FavoritesController {
/**
 * Adds a Recipe to a User's list Favorite recipes
 * @param {object} req - request id of recipe to be added to Favorites
 * @param {object} res - success message indicating recipe added or removed from favorites
 * @returns {json} - success message returned
 */
  async addFavorite(req, res) {
    const query = { where: { userId: req.AuthUser.id, recipeId: req.params.recipeId } };
    const favorite = await Favorite.findOne(query);

    if (favorite) {
      await favorite.destroy();
      return res.status(200).json({
        message: 'Successfully removed this recipe from Favorites'
      });
    }

    await Favorite.create({
      userId: req.AuthUser.id,
      recipeId: req.params.recipeId
    });
    const recipe = req.FavoriteRecipe;
    return res.status(201).json({
      recipe, message: 'Recipe successfully added to Favorites!'
    });
  }
  /**
   * Get User's Favorite recipes
   * @param {object} req - request to get all the favorite recipes of a user
   * @param {object} res - array of recipes
   * @returns {json} - array of recipes
   */
  async getFavorites(req, res) {
    try {
      const query = { where: { userId: req.AuthUser.id } };
      const favorites = await Favorite.findAll(query);

      if (favorites.length < 1) {
        return res.status(404).json({
          message: 'You have no Favorite Recipes'
        });
      }
      const recipeIds = favorites.map(favorite => favorite.recipeId);
      const nextQuery = {
        where: { id: { [db.Sequelize.Op.in]: recipeIds } },
        include: [{ all: true, attributes: { exclude: ['Password'] }, nested: true }]
      };
      const recipes = await Recipe.findAll(nextQuery);
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
     * deletes a recipe from a user's favorites
     * @param {object} req - recipe object
     * @param {object} res - message
     * @returns {json} - message returned
     */
  deleteFavorite(req, res) {
    return Favorite.findById(req.params.favoriteId).then((favorite) => {
      favorite.destroy().then(() => res.status(200).json({
        message: 'Successfully deleted this recipe from your favorites'
      }))
        .catch(error => res.status(500).json({
          message: error.message
        }));
    });
  }
}

