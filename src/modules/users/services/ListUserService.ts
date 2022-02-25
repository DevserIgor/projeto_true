import { getCustomRepository, Like } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IPaginateUser {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: User[];
}
class ListUserService {
  public async execute(name?: string): Promise<IPaginateUser> {
    const usersRepository = getCustomRepository(UsersRepository);

    const queryBuilder = await usersRepository.createQueryBuilder();
    if (name) {
      queryBuilder.where({ name: Like(`%${name}%`) });
    }
    const users = await queryBuilder.addOrderBy('name', 'ASC').paginate(5);

    return users as IPaginateUser;
  }
}

export default ListUserService;
