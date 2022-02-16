import ValidStoreDomainService from '@modules/stores/services/ValidStoreDomainService';
import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

export default async function allowedStores(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const origin = request.headers.origin;

  if (!origin) {
    throw new AppError('Origin is not present.');
  }

  try {
    const validStoreDomainService = new ValidStoreDomainService();
    await validStoreDomainService.execute({ domain: origin });

    return next();
  } catch {
    throw new AppError('Loja não autorizada.');
  }

  // if (!store) {
  //   throw new AppError('Loja não autorizada.');
  // }
}
