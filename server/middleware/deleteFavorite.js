import db from '../models/index';

const { Favorite } = db;

export default (req, res, next) => {
  Favorite.findById(req.params.favoriteId).then((favorite) => {
    if (!favorite) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    if (favorite.userId !== req.AuthUser.id) {
      return res.status(401).json({ message: 'Unauthorised!' });
    }

    next();
  }).catch(() => res.status(400).json({ message: 'Invalid Request' }));
};
