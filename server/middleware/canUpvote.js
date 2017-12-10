import db from '../models/index';


export default async (req, res, next) => {
  try {
    const recipe = await db.Recipe.findById(req.params.recipeId);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found.' });
    }

    if (recipe.userId === req.AuthUser.id) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }

    const query = { where: { userId: req.AuthUser.id, recipeId: req.params.recipeId } };

    const downvote = await db.Downvote.findOne(query);

    if (downvote) {
      await downvote.destroy();
    }

    //  req.currentRecipe = recipe;
    next();
  } catch (error) {
    return res.status(422).json({ message: 'Invalid Request.' });
  }
};
