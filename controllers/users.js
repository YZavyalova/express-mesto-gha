import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import ValidationError from '../errors/ValidationError.js';
import ErrorConflict from '../errors/ErrorConflict.js';
import ErrorNotFound from '../errors/ErrorNotFound.js';

const SALT_ROUNDS = 10;
const { JWT_SECRET } = process.env;

export const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

export const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new ErrorNotFound())
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
};

export const findUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => new ErrorNotFound())
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError());
      } else {
        next(err);
      }
    });
};

export const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ErrorConflict();
      }
      return bcrypt.hash(password, SALT_ROUNDS);
    })
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => User.findOne({ _id: user._id }))
    .then((user) => res.send({ user }))
    .catch(next);
};

export const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => new ErrorNotFound())
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные в методы обновления профиля'));
      } else {
        next(err);
      }
    });
};

export const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => new ErrorNotFound())
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные в методы обновления аватара'));
      } else {
        next(err);
      }
    });
};

export const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          expires: new Date(Date.now() + 7 * 24 * 3600000),
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: 'Авторизация прошла успешно' });
    })
    .catch(next);
};
