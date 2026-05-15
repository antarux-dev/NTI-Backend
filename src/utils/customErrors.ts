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
    super(message, 404);
  }
}

export class ValidationError extends CustomError {
  constructor(message: string = 'Validation failed') {
    super(message, 400);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message: string = 'Forbidden') {
    super(message, 403);
  }
}
