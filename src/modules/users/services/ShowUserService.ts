import AppError from '@shared/errors/AppError';
import { getCustomRepository, getRepository } from 'typeorm';
import User from '../typeorm/entities/User';
// import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
  id: string;
}

class ShowUserService {
  public async execute({ id }: IRequest): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('Usuário não encontrada.');
    }

    return user;
  }
}

export default ShowUserService;
