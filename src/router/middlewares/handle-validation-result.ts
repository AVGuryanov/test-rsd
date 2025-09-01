import { NextFunction, Request, Response } from "express";
import { validationResult } from 'express-validator';

export const handleValidationResultMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const result = validationResult(req);

  return result.isEmpty() ? next() : next({ code: 400, error: result.mapped() });
}
