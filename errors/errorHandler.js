import { isCelebrateError } from 'celebrate';

const errorHandler = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(err.stack || err);
  const status = err.statusCode || 500;
  const { message } = err;

  if (isCelebrateError(err)) {
    const [error] = err.details.values();
    return res.status(400).send({ message: error.message });
  }

  res.status(status).json({ err: message || 'Произошла ошибка на сервере' });
  return next();
};

export default errorHandler;
