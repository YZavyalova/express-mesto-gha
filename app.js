import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import errorHandler from './errors/errorHandler.js';
import { login, createUser } from './controllers/users.js';
import { validateRegister } from './middlewares/validation.js';
import usersRouter from './routes/users.js';
import cardRouter from './routes/cards.js';
import auth from './middlewares/auth.js';
import ErrorNotFound from './errors/ErrorNotFound.js';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

// роуты, не требующие авторизации,
app.post('/signup', validateRegister, createUser);
app.post('/signin', validateRegister, login);

app.use(auth);

app.use('/', usersRouter);
app.use('/', cardRouter);

app.use(() => {
  throw new ErrorNotFound('Страница не найдена');
});

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}...`);
});
