import db from '../models/index';

const { User } = db;

export default (request, response, next) => {
  User.findById(request.params.userId).then((user) => {
    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }

    if (user.id !== request.AuthUser.id) {
      return response.status(401).json({ message: 'Unauthorized' });
    }

    next();
  }).catch(() => response.status(400).json({ message: 'Invalid request' }));
};
