import jwt from 'jsonwebtoken';
import apiResponse from '../helpers';

export default (req, res, next) => {
  const { token } = req.headers;

  return jwt.verify(token, 'secret', (error, user) => {
    if (error) {
      return apiResponse('fail', 401, { message: 'Unauthenticated USER.' }, res);
    }

    req.AuthUser = user;
    next();
  });
};
