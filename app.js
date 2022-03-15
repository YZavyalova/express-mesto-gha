import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import usersRouter from './routes/users.js';
import cardsRouter from './routes/cards.js';

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

mongoose.connect('mongodb://localhost:27017/mestodb');

// мидлвеар
app.use((req, res, next) => {
  req.user = {
    _id: '6230cd0373fd793c915c654f', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

app.use(usersRouter);
app.use(cardsRouter);
app.use((req, res) => res.status(404).send({ message: 'Страница не найдена' }));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});
