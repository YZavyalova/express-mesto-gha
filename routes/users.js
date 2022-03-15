import { Router } from 'express';
import {
  getUsers,
  findUser,
  createUser,
  updateProfile,
  updateAvatar,
} from '../controllers/users.js';

const usersRouter = Router();

usersRouter.get('/users', getUsers);

usersRouter.get('/users/:userId', findUser);

usersRouter.post('/users', createUser);

usersRouter.patch('/users/me', updateProfile);

usersRouter.patch('/users/me/avatar', updateAvatar);

export default usersRouter;
