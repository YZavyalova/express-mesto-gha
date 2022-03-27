import { Router } from 'express';
import {
  getUsers,
  getCurrentUser,
  findUser,
  updateProfile,
  updateAvatar,
} from '../controllers/users.js';
import { validateProfile, validateAvatar, validateId } from '../middlewares/validation.js';

const usersRouter = Router();

usersRouter.get('/users', getUsers);
usersRouter.get('/users/me', getCurrentUser);
usersRouter.get('/users/:id', validateId, findUser);
usersRouter.patch('/users/me', validateProfile, updateProfile);
usersRouter.patch('/users/me/avatar', validateAvatar, updateAvatar);

export default usersRouter;
