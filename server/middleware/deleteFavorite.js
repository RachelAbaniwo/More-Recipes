import db from '../models/index';

const { Favorite } = db;

export default (request, response, next) => {
  Favorite.findById(request.params.favoriteId).then((favorite) => {
    if (!favorite) {
      return response.status(404).json({ message: 'Recipe not found' });
    }

    if (favorite.userId !== request.AuthUser.id) {
      return response.status(401).json({ message: 'Unauthorized' });
    }

    next();
  }).catch(() => response.status(400).json({ message: 'Invalid request' }));
};
