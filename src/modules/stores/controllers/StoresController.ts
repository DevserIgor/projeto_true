import { Request, Response } from 'express';
import CreateStoreService from '../services/CreateStoreService';
import DeleteStoreService from '../services/DeleteStoreService';
import ListStoreService from '../services/ListStoreService';
import ShowStoreService from '../services/ShowStoreService';
import UpdateStoretService from '../services/UpdateStoretService';

export default class StoresController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listStores = new ListStoreService();

    const stores = await listStores.execute();

    return response.json(stores);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showStore = new ShowStoreService();

    const store = await showStore.execute({ id });
    return response.json(store);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { cnpj, name, domain } = request.body;

    const createStore = new CreateStoreService();

    const store = await createStore.execute({
      cnpj,
      name,
      domain,
    });

    return response.json(store);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { cnpj, name, domain } = request.body;
    const { id } = request.params;

    const updateStore = new UpdateStoretService();

    const store = await updateStore.execute({
      id,
      cnpj,
      name,
      domain,
    });

    return response.json(store);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletStore = new DeleteStoreService();

    await deletStore.execute({ id });
    return response.json([]);
  }
}
