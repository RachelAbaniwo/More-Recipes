import jwt from 'jsonwebtoken';
import apiResponse from '../helpers';

export default (req, res, next) => {
  const token = req.body.token || req.headers.token;

  return jwt.verify(token, 'secret', (error, user) => {
    if (error) {
      return apiResponse('fail', 401, { message: error.message }, res);
    }

    req.AuthUser = user;
    next();
  });
};
