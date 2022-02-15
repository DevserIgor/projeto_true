import { EntityRepository, Repository } from 'typeorm';
import Store from '../entities/Store';

@EntityRepository(Store)
class StoreRepository extends Repository<Store> {
  public async findById(id: string): Promise<Store | undefined> {
    const existsStore = await this.findOne({
      where: {
        id: id,
      },
    });

    return existsStore;
  }

  public async findByCnpj(cnpj: string): Promise<Store | undefined> {
    const existsStore = await this.findOne({
      where: {
        cnpj,
      },
    });

    return existsStore;
  }

  public async findByDomain(domain: string): Promise<Store | undefined> {
    const existsStore = await this.findOne({
      where: {
        domain,
      },
    });

    return existsStore;
  }
}

export default StoreRepository;
