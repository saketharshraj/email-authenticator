class ApiError {
  constructor(message, code) {
    this.message = message;
    this.code = code;
  }

  static badRequest(message) {
    return new ApiError(message, 400);
  }

  static unauthorized(message) {
    return new ApiError(message, 401);
  }

  static forbidden(message) {
    return new ApiError(message, 403);
  }

  static conflict(message) {
    return new ApiError(message, 409);
  }

  static notFound(message) {
    return new ApiError(message, 404);
  }

  static failedDependency(message) {
    return new ApiError(message, 424);
  }

  static internalServerError(message) {
    return new ApiError(message, 500);
  }
}

module.exports = ApiError;

