import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';
import { instanceToInstance } from 'class-transformer';
import ShowUserService from '../services/ShowUserService';
import UpdateUserService from '../services/UpdateUserService';
import DeleteUserService from '../services/DeleteUserService';
import * as core from 'express-serve-static-core';

interface ListRequest extends Response {
  query: QueryParams;
}

interface QueryParams
  extends Request<
    core.ParamsDictionary,
    any,
    any,
    core.Query,
    Record<string, any>
  > {
  name: string;
}

export default class UsersController {
  public async index(
    request: ListRequest,
    response: Response,
  ): Promise<Response> {
    const { name } = request.query;
    const listUsers = new ListUserService();

    const users = await listUsers.execute(name);

    return response.json(instanceToInstance(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(instanceToInstance(user));
  }
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUser = new ShowUserService();

    const user = await showUser.execute({ id });
    return response.json(user);
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const { id } = request.params;

    const updateUser = new UpdateUserService();

    const assessment = await updateUser.execute({
      id,
      name,
      email,
      password,
    });

    return response.json(assessment);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletUser = new DeleteUserService();

    await deletUser.execute({ id });
    return response.json([]);
  }
}
