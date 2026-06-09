import { HTTP_STATUS } from '@config/httpStatus.js';

export class CustomError extends Error {
  public readonly status: number;
  public readonly isExpectedError: boolean;

  constructor(message: string, status: number = 500, isExpectedError: boolean = true) {
    super(message);
    this.status = status;
    this.isExpectedError = isExpectedError;
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string = 'Resource not found') {
    super(message, HTTP_STATUS.NOT_FOUND);
  }
}

export class ValidationError extends CustomError {
  constructor(message: string = 'Validation failed') {
    super(message, HTTP_STATUS.BAD_REQUEST);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string = 'Unauthorized') {
    super(message, HTTP_STATUS.UNAUTHORIZED);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message: string = 'Forbidden') {
    super(message, HTTP_STATUS.FORBIDDEN);
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string = 'Bad Request') {
    super(message, HTTP_STATUS.BAD_REQUEST);
  }
}

export class InternalServerError extends CustomError {
  constructor(message: string = 'Internal Server Error') {
    super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR, false);
  }
}

export class ExceededRateLimitError extends CustomError {
  constructor(message: string = 'Too many requests') {
    super(message, HTTP_STATUS.TOO_MANY_REQUESTS);
  }
}
