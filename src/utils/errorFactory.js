const AppError = require('../errors/AppError');
const {
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  DatabaseError,
  ExternalServiceError
} = require('../errors/errorTypes');

/**
 * Error factory for creating consistent errors
 */
class ErrorFactory {
  static validation(message, details = null) {
    const error = new ValidationError(message);
    if (details) error.details = details;
    return error;
  }

  static notFound(resource = 'Resource') {
    return new NotFoundError(resource);
  }

  static unauthorized(message) {
    return new UnauthorizedError(message);
  }

  static forbidden(message) {
    return new ForbiddenError(message);
  }

  static conflict(message) {
    return new ConflictError(message);
  }

  static database(message, originalError = null) {
    const error = new DatabaseError(message);
    if (originalError) error.originalError = originalError;
    return error;
  }

  static externalService(service, message) {
    return new ExternalServiceError(service, message);
  }

  static custom(message, statusCode, isOperational = true) {
    return new AppError(message, statusCode, isOperational);
  }
}

module.exports = ErrorFactory;