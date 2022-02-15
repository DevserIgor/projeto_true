import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Store from '../typeorm/entities/Store';
import StoreRepository from '../typeorm/repositories/StoresRepository';

interface IRequest {
  id: string;
}

class ShowStoreService {
  public async execute({ id }: IRequest): Promise<Store> {
    const storesRepository = getCustomRepository(StoreRepository);

    const store = await storesRepository.findOne(id);

    if (!store) {
      throw new AppError('Loja não encontrada.');
    }

    return store;
  }
}

export default ShowStoreService;
