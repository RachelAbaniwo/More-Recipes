import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;


export default (req, res, next) => {
  const { token } = req.headers;
  return jwt.verify(token, jwtSecret, (error, user) => {
    if (error) {
      return res.status(401).json({ message: 'Unauthenticated USER.' });
    }

    req.AuthUser = user;
    next();
  });
};
