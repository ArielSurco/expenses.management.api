import { type NextFunction, type Request, type Response } from 'express'

type Middleware = (req: Request, res: Response, next: NextFunction) => Promise<void>

// Allows us to use async/await with custom middlewares
export const asyncMiddleware =
  (middleware: Middleware) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(middleware(req, res, next)).catch((reason: unknown) => next(reason))
