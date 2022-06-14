import { NextFunction, Request, Response } from 'express';

export default function routeMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.url = req.url.replace(/\/$/g, '');
  req.method = req.method.toLocaleUpperCase();
  next();
}
