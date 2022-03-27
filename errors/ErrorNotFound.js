class ErrorNotFound extends Error {
  constructor(message = 'Пользователь не найден') {
    super(message);
    this.statusCode = 404;
  }
}

export default ErrorNotFound;
