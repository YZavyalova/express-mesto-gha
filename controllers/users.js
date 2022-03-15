import user from '../models/user.js';

const ERR_BAD_REQUEST = 400;
const ERR_NOT_FOUND = 404;
const ERR_DEFAULT = 500;

export const getUsers = (req, res) => {
  user.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(ERR_DEFAULT).send({ message: 'Произошла ошибка' }));
};

export const findUser = (req, res) => {
  user.findById(req.params.userId)
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERR_BAD_REQUEST).send({
          message: 'Переданы некорректные данные в методы создания пользователя',
        });
      }
      if (err.message === 'NotFound') {
        res.status(ERR_NOT_FOUND).send({
          message: 'Запрашиваемый пользователь не найден',
        });
      } else {
        res.status(ERR_DEFAULT).send({ message: 'Произошла ошибка' });
      }
    });
};

export const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  user.create({ name, about, avatar })
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERR_BAD_REQUEST).send({
          message: 'Переданы некорректные данные в методы создания пользователя',
        });
      } else {
        res.status(ERR_DEFAULT).send({ message: 'Произошла ошибка' });
      }
    });
};

export const updateProfile = (req, res) => {
  const { name, about } = req.body;
  user.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERR_BAD_REQUEST).send({
          message: 'Переданы некорректные данные в методы обновления профиля',
        });
      } else if (err.message === 'NotFound') {
        res.status(ERR_NOT_FOUND).send({
          message: 'Пользователь не найден',
        });
      } else {
        res.status(ERR_DEFAULT).send({ message: 'Произошла ошибка' });
      }
    });
};

export const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  user.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(ERR_BAD_REQUEST).send({
          message: 'Переданы некорректные данные в методы обновления аватара',
        });
      } else if (err.message === 'NotFound') {
        res.status(ERR_NOT_FOUND).send({
          message: 'Пользователь не найден',
        });
      } else {
        res.status(ERR_DEFAULT).send({ message: 'Произошла ошибка' });
      }
    });
};
