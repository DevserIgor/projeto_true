import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import AssessmentRepository from '../typeorm/repositories/AssessmentRepository';

interface IRequest {
  id: string;
}

class DeleteAssessmentService {
  public async execute({ id }: IRequest): Promise<void> {
    const assessmentsRepository = getCustomRepository(AssessmentRepository);

    const assessment = await assessmentsRepository.findOne(id);

    if (!assessment) {
      throw new AppError('Loja nao encontrada.');
    }

    await assessmentsRepository.remove(assessment);
  }
}

export default DeleteAssessmentService;
