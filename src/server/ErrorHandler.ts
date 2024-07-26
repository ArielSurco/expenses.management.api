import type { NextFunction, Request, Response } from 'express';

import { ENV } from '../shared/constants/env';

import { type ResponseError } from './ResponseError';

export const ErrorHandler = (
  err: Partial<ResponseError>,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    next(err);

    return;
  }

  const errorStatus = err.statusCode ?? 500
  const errorMessage = err.message ?? 'Internal server error'
  const showStack = ENV.NODE_ENV === 'development'

  res.status(errorStatus)
  res.json({
    status: errorStatus,
    message: errorMessage,
    issues: err.issues,
    stack: showStack ? err.stack : undefined,
  })
}