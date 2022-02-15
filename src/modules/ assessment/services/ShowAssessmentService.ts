import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Assessment from '../typeorm/entities/Assessment';
import AssessmentRepository from '../typeorm/repositories/AssessmentRepository';

interface IRequest {
  id: string;
}

class ShowAssessmentService {
  public async execute({ id }: IRequest): Promise<Assessment> {
    const assessmentsRepository = getCustomRepository(AssessmentRepository);

    const assessment = await assessmentsRepository.findOne(id);

    if (!assessment) {
      throw new AppError('Avaliação não encontrada.');
    }

    return assessment;
  }
}

export default ShowAssessmentService;
