import db from '../models/index';

const { Review } = db;

export default (req, res, next) => {
  Review.findById(req.params.reviewId).then((review) => {
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.userId !== req.AuthUser.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
  }).catch(() => res.status(400).json({ message: 'Invalid request' }));
};
