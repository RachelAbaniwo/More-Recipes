import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Token } from '../models';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;


export default (request, response, next) => {
  const { token } = request.headers;
  return jwt.verify(token, jwtSecret, (error, user) => {
    if (error) {
      if (error.name === 'TokenExpiredError') {
        return response.status(401).json({ message: 'Token Expired.' });
      }

      return response.status(401).json({ message: 'Unauthenticated' });
    }

    return Token.find({
      where: {
        token
      }
    }).then((foundToken) => {
      if (foundToken) {
        return response.status(401).json({ message: 'Unauthenticated' });
      }

      request.AuthUser = user;
      request.authUserToken = token;
      next();
    });
  });
};
