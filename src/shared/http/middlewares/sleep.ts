import { NextFunction, Request, Response } from 'express';

export const sleep = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
  next();
};
