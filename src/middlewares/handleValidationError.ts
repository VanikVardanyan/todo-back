import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from 'express'

export default (req: Request, res:Response , next: NextFunction) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error });
  }
  next();
};
