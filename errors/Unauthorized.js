class Unauthorized extends Error {
  constructor(message = 'Неправильный email или пароль') {
    super(message);
    this.statusCode = 401;
  }
}

export default Unauthorized;
