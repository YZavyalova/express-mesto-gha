class ErrorConflict extends Error {
  constructor(message = 'Пользователь с таким email уже зарегистрирован') {
    super(message);
    this.statusCode = 409;
  }
}

export default ErrorConflict;
