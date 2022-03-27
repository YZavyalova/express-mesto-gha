import jwt from 'jsonwebtoken';
import Forbidden from '../errors/Forbidden.js';

const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new Forbidden('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};

export default auth;
