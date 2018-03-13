import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

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

    request.AuthUser = user;
    next();
  });
};
