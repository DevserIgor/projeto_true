import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Store from '../typeorm/entities/Store';
import StoreRepository from '../typeorm/repositories/StoresRepository';

interface IRequest {
  cnpj: string;
  name: string;
  domain: string;
}
class CreateStoreService {
  public async execute({ cnpj, name, domain }: IRequest): Promise<Store> {
    const storesRepository = getCustomRepository(StoreRepository);

    const storeExistsCnpj = await storesRepository.findByCnpj(cnpj);
    if (storeExistsCnpj) {
      throw new AppError('Já existe uma loja com este CNPJ.');
    }

    const storeExistsDomain = await storesRepository.findByDomain(domain);
    if (storeExistsDomain) {
      throw new AppError('Já existe uma loja com este domínio.');
    }

    const store = storesRepository.create({
      cnpj,
      name,
      domain,
    });

    await storesRepository.save(store);

    return store;
  }
}

export default CreateStoreService;
