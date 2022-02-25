import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository, Timestamp, getRepository } from 'typeorm';
import User from '../typeorm/entities/User';
interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}
class UpdateUserService {
  public async execute({ id, name, email, password }: IRequest): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(id);
    if (!user) {
      throw new AppError('Avaliação não encontrada.');
    }
    // const emailExistis = await userRepository.find({ email });

    // if (emailExistis) {
    //   throw new AppError('Email address already used');
    // }

    user.name = name;
    user.email = email;

    if (password) {
      const hashedPassword = await hash(password, 8);
      user.password = hashedPassword;
    }

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
