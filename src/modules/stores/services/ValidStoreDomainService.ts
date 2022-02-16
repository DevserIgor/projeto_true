import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Store from '../typeorm/entities/Store';
import StoreRepository from '../typeorm/repositories/StoresRepository';

interface IRequest {
  domain: string;
}

class ValidStoreDomainService {
  public async execute({ domain }: IRequest): Promise<Store> {
    const storesRepository = getCustomRepository(StoreRepository);

    const store = await storesRepository.findByDomain(domain);

    if (!store) {
      throw new AppError('Loja não encontrada.');
    }

    return store;
  }
}

export default ValidStoreDomainService;
