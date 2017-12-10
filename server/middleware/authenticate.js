import jwt from 'jsonwebtoken';


export default (req, res, next) => {
  const { token } = req.headers;

  return jwt.verify(token, 'secret', (error, user) => {
    if (error) {
      return res.status(401).json({ message: 'Unauthenticated USER.' });
    }

    req.AuthUser = user;
    next();
  });
};
