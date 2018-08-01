import db from '../models/index';

const { Review } = db;

export default (request, response, next) => {
  Review.findById(request.params.reviewId).then((review) => {
    if (!review) {
      return response.status(404).json({ message: 'Review not found' });
    }

    if (review.userId !== request.AuthUser.id) {
      return response.status(401).json({ message: 'Unauthorized' });
    }

    next();
  }).catch(() => response.status(400).json({ message: 'Invalid request' }));
};
