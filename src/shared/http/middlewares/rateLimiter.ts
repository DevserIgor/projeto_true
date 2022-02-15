import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { Pool } from 'pg';

import { BurstyRateLimiter, RateLimiterPostgres } from 'rate-limiter-flexible';

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const client = new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    });
    // console.log(client);

    const limiter = new RateLimiterPostgres({
      storeClient: client,
      points: 5, // Number of points
      duration: 10, // Per second(s)
    });

    await limiter.consume(request.ip);

    return next();
  } catch (err) {
    throw new AppError('Teste', 429);
  }
}
