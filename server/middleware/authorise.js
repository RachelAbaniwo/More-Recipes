import db from '../models/index';
import apiResponse from '../helpers';

export default (req, res, next) => {
  db.Recipe.findById(req.params.id).then((recipe) => {
    if (!recipe) {
      return apiResponse('fail', 404, { message: 'Recipe not found' }, res);
    }

    if (recipe.userId !== req.AuthUser.id) {
      return apiResponse('fail', 401, { message: 'Unauthorized USER' }, res);
    }

    next();
  }).catch(() => apiResponse('fail', 422, { message: 'Invalid Request' }, res));
};
