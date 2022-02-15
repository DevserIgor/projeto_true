import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Store from '../typeorm/entities/Store';
import StoreRepository from '../typeorm/repositories/StoresRepository';

interface IRequest {
  id: string;
  cnpj: string;
  name: string;
  domain: string;
}
class UpdateStoretService {
  public async execute({ id, cnpj, name, domain }: IRequest): Promise<Store> {
    const storesRepository = getCustomRepository(StoreRepository);

    const store = await storesRepository.findOne(id);
    if (!store) {
      throw new AppError('Loja não encontrada.');
    }

    const storeCnpjExists = await storesRepository.findByCnpj(cnpj);
    if (storeCnpjExists && cnpj !== store.cnpj) {
      throw new AppError('Já existe uma loja com este cnpj.');
    }

    const storeDomainExists = await storesRepository.findByDomain(domain);
    if (storeDomainExists && domain !== store.domain) {
      throw new AppError('Já existe uma loja com este domínio.');
    }

    store.cnpj = cnpj;
    store.name = name;
    store.domain = domain;

    await storesRepository.save(store);

    return store;
  }
}

export default UpdateStoretService;
