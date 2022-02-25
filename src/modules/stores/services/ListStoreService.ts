import { getCustomRepository, ILike } from 'typeorm';
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
interface IFiltersQuery {
  cnpj: string;
  name: string;
  domain: string;
  active: boolean;
}

class ListStoreService {
  public async execute({
    cnpj,
    name,
    domain,
    active,
  }: IFiltersQuery): Promise<IPaginateStore> {
    const storesRepository = getCustomRepository(StoreRepository);

    const queryBuilder = storesRepository.createQueryBuilder();

    if (cnpj) {
      queryBuilder.where({
        cnpj: ILike(`%${cnpj}%`),
      });
    }
    if (name) {
      queryBuilder.where({
        name: ILike(`%${name}%`),
      });
    }
    if (domain) {
      queryBuilder.where({
        domain: ILike(`%${domain}%`),
      });
    }
    if (active) {
      queryBuilder.where({
        active,
      });
    }

    const stores = await queryBuilder.addOrderBy('name', 'ASC').paginate(5);

    return stores as IPaginateStore;
  }
}

export default ListStoreService;
