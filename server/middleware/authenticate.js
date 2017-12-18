import jwt from 'jsonwebtoken';
import config from './../config';


export default (req, res, next) => {
  const { token } = req.headers;
  return jwt.verify(token, config.jwtSecret, (error, user) => {
    if (error) {
      return res.status(401).json({ message: 'Unauthenticated USER.' });
    }

    req.AuthUser = user;
    next();
  });
};
