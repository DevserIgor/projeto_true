import { getCustomRepository } from 'typeorm';
import Store from '../typeorm/entities/Store';
import StoreRepository from '../typeorm/repositories/StoresRepository';

interface IPaginateStore {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Store[];
}

class ListStoreService {
  public async execute(): Promise<IPaginateStore> {
    const storesRepository = getCustomRepository(StoreRepository);

    const stores = await storesRepository.createQueryBuilder().paginate(5);

    return stores as IPaginateStore;
  }
}

export default ListStoreService;
