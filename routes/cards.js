import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteUser,
  likeCard,
  dislikeCard,
} from '../controllers/cards.js';

const cardRouter = Router();

cardRouter.get('/cards', getCards);

cardRouter.post('/cards', createCard);

cardRouter.delete('/cards/:cardId', deleteUser);

cardRouter.put('/cards/:cardId/likes', likeCard);

cardRouter.delete('/cards/:cardId/likes', dislikeCard);

export default cardRouter;
