import card from '../models/card.js';

const ERR_BAD_REQUEST = 400;
const ERR_NOT_FOUND = 404;
const ERR_DEFAULT = 500;

export const getCards = (req, res) => {
  card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(ERR_DEFAULT).send({ message: 'Произошла ошибка' }));
};

export const createCard = (req, res) => {
  const { name, link } = req.body;
  card.create({ name, link, owner: req.user._id })
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERR_BAD_REQUEST).send({
          message: 'Переданы некорректные данные в методы создания карточки',
        });
      } else {
        res.status(ERR_DEFAULT).send({ message: 'Произошла ошибка' });
      }
    });
};

export const deleteCard = (req, res) => {
  card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERR_BAD_REQUEST).send({
          message: 'Переданы некорректные данные',
        });
      } else if (err.message === 'NotFound') {
        res.status(ERR_NOT_FOUND).send({
          message: 'Карточка не найдена',
        });
      } else {
        res.status(ERR_DEFAULT).send({ message: 'Произошла ошибка' });
      }
    });
};

export const likeCard = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(ERR_BAD_REQUEST).send({
          message: 'Переданы некорректные данные',
        });
      } else if (err.message === 'NotFound') {
        res.status(ERR_NOT_FOUND).send({
          message: 'Карточка не найдена',
        });
      } else {
        res.status(ERR_DEFAULT).send({ message: 'Произошла ошибка' });
      }
    });
};

export const dislikeCard = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(ERR_BAD_REQUEST).send({
          message: 'Переданы некорректные данные',
        });
      } else if (err.message === 'NotFound') {
        res.status(ERR_NOT_FOUND).send({
          message: 'Карточка не найдена',
        });
      } else {
        res.status(ERR_DEFAULT).send({ message: 'Произошла ошибка' });
      }
    });
};
