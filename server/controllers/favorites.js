import db from '../models';

const { Favorite, Recipe } = db;
/**
 * Controls the favorites endpoints
 * @class FavoritesController
 */
export default class FavoritesController {
  /**
   * Adds a Recipe to a User's list Favorite recipes
   * @function addFavorite
   *
   * @param {object} request - request id of recipe to be added to Favorites
   * @param {object} response - success message indicating recipe added or
   * removed from favorites
   *
   * @returns {json} - success message returned
   */
  async addFavorite(request, response) {
    const query = {
      where: { userId: request.AuthUser.id, recipeId: request.params.recipeId }
    };
    const favorite = await Favorite.findOne(query);

    if (favorite) {
      await favorite.destroy();
      const recipe = request.FavoriteRecipe;
      await recipe.decrement('favorites');
      return response.status(200).json({
        recipe, message: 'Successfully removed this recipe from favorites'
      });
    }

    const newFavorite = await Favorite.create({
      userId: request.AuthUser.id,
      recipeId: request.params.recipeId
    });
    const recipe = request.FavoriteRecipe;
    await recipe.increment('favorites');
    return response.status(201).json({
      recipe,
      favorite: newFavorite,
      message: 'Recipe successfully added to favorites!'
    });
  }
  /**
   * Get User's Favorite recipes
   * @function getFavorites
   *
   * @param {object} request - request to get all the favorite recipes of a user
   * @param {object} response - array of recipes
   *
   * @returns {json} - array of recipes and success message or an error message
   */
  async getFavorites(request, response) {
    try {
      const query = { where: { userId: request.AuthUser.id } };
      const favorites = await Favorite.findAll(query);

      if (favorites.length < 1) {
        return response.status(404).json({
          message: 'You have no favorite recipes'
        });
      }
      const recipeIds = favorites.map(favorite => favorite.recipeId);
      const nextQuery = {
        where: { id: { [db.Sequelize.Op.in]: recipeIds } },
        include: [
          { all: true, attributes: { exclude: ['password'] }, nested: true }
        ]
      };
      const recipes = await Recipe.findAll(nextQuery);
      return response.status(200).json({
        favoriteRecipes: recipes
      });
    } catch (error) {
      return response.status(500).json({
        message: error.message
      });
    }
  }
  /**
     * deletes a recipe from a user's favorites
     * @function deleteFavorite
     *
     * @param {object} request - recipe object
     * @param {object} response - message return to user
     *
     * @returns {json} - message returned
     */
  deleteFavorite(request, response) {
    return Favorite.findById(request.params.favoriteId).then((favorite) => {
      favorite.destroy().then(() => response.status(200).json({
        message: 'Successfully deleted this recipe from your favorites'
      }))
        .catch(error => response.status(500).json({
          message: error.message
        }));
    });
  }
}

