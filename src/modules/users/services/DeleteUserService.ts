import AppError from '@shared/errors/AppError';
import { getCustomRepository, getRepository } from 'typeorm';
import User from '../typeorm/entities/User';

interface IRequest {
  id: string;
}

class DeleteUserService {
  public async execute({ id }: IRequest): Promise<void> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('Usuário nao encontrada.');
    }

    await usersRepository.remove(user);
  }
}

export default DeleteUserService;
