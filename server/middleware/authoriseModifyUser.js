import db from '../models/index';

const { User } = db;

export default (req, res, next) => {
  User.findById(req.params.userId).then((user) => {
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.id !== req.AuthUser.id) {
      return res.status(401).json({ message: 'Unauthorized USER' });
    }

    next();
  }).catch(() => res.status(400).json({ message: 'Invalid Request' }));
};
