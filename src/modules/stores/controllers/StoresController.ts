import { Request, Response } from 'express';
import CreateStoreService from '../services/CreateStoreService';
import DeleteStoreService from '../services/DeleteStoreService';
import ListStoreService from '../services/ListStoreService';
import ShowStoreService from '../services/ShowStoreService';
import UpdateStoretService from '../services/UpdateStoretService';
import * as core from 'express-serve-static-core';
interface PaginationQuery {
  page: string;
}

interface FilterQuery extends PaginationQuery {
  cnpj: string;
  name: string;
  domain: string;
  active: boolean;
}
interface RequestFilter
  extends Request<
    core.ParamsDictionary,
    any,
    any,
    FilterQuery,
    Record<string, any>
  > {
  query: FilterQuery;
}

export default class StoresController {
  public async index(
    request: RequestFilter,
    response: Response,
  ): Promise<Response> {
    const { cnpj, name, domain, active } = request.query;
    const listStores = new ListStoreService();

    const stores = await listStores.execute({
      cnpj,
      name,
      domain,
      active,
    });

    return response.json(stores);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showStore = new ShowStoreService();

    const store = await showStore.execute({ id });
    return response.json(store);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { cnpj, name, domain, active } = request.body;

    const createStore = new CreateStoreService();

    const store = await createStore.execute({
      cnpj,
      name,
      domain,
      active,
    });

    return response.json(store);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { cnpj, name, domain, active } = request.body;
    const { id } = request.params;

    const updateStore = new UpdateStoretService();

    const store = await updateStore.execute({
      id,
      cnpj,
      name,
      domain,
      active,
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
