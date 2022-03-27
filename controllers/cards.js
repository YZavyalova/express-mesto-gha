import cardModel from '../models/card.js';
import Forbidden from '../errors/Forbidden.js';
import ErrorNotFound from '../errors/ErrorNotFound.js';
import ValidationError from '../errors/ValidationError.js';

export const getCards = (req, res, next) => {
  cardModel.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

export const createCard = (req, res, next) => {
  const { name, link } = req.body;
  cardModel.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные в методы создания карточки'));
      } else {
        next(err);
      }
    });
};

export const deleteCard = (req, res, next) => {
  cardModel.findById(req.params.id)
    .orFail(() => new ErrorNotFound('Карточка не найдена'))
    .then(({ owner }) => {
      if (owner.toString() === req.user._id) {
        cardModel.findByIdAndDelete(req.params.id).then((card) => {
          res.send({ card });
        });
      } else {
        throw new Forbidden('Недостаточно прав');
      }
    })
    .catch(next);
};

export const likeCard = (req, res, next) => {
  cardModel.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new ErrorNotFound('Карточка не найдена'))
    .then((likes) => res.send({ data: likes }))
    .catch(next);
};

export const dislikeCard = (req, res, next) => {
  cardModel.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new ErrorNotFound('Карточка не найдена'))
    .then((likes) => res.send({ data: likes }))
    .catch(next);
};
