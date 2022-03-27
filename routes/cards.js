import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards.js';
import { validateCard, validateId } from '../middlewares/validation.js';

const cardRouter = Router();

cardRouter.get('/cards', getCards);

cardRouter.post('/cards', validateCard, createCard);

cardRouter.delete('/cards/:id', validateId, deleteCard);

cardRouter.put('/cards/:id/likes', validateId, likeCard);

cardRouter.delete('/cards/:id/likes', validateId, dislikeCard);

export default cardRouter;
