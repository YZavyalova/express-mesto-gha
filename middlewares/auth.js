import jwt from 'jsonwebtoken';
import Unauthorized from '../errors/Unauthorized.js';

const { JWT_SECRET = 'JWT_SECRET' } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new Unauthorized('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};

export default auth;
