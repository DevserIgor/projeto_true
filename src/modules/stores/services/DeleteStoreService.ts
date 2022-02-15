import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import StoreRepository from '../typeorm/repositories/StoresRepository';

interface IRequest {
  id: string;
}

class DeleteStoreService {
  public async execute({ id }: IRequest): Promise<void> {
    const storesRepository = getCustomRepository(StoreRepository);

    const store = await storesRepository.findOne(id);

    if (!store) {
      throw new AppError('Loja nao encontrada.');
    }

    await storesRepository.remove(store);
  }
}

export default DeleteStoreService;
