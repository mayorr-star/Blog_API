class ServerError extends Error {
  constructor(message) {
    super(message);
    this.status = 500;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
    this.name = 'NotFoundError';
  }
}

module.exports = { ServerError, NotFoundError };
