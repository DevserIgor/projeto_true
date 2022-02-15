import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Assessment from '../typeorm/entities/Assessment';
import AssessmentRepository from '../typeorm/repositories/AssessmentRepository';

interface IRequest {
  name: string;
  stars: number;
  message: string;
  date: Date;
}
class CreateAssessmentService {
  public async execute({
    name,
    stars,
    message,
    date,
  }: IRequest): Promise<Assessment> {
    const assessmentsRepository = getCustomRepository(AssessmentRepository);

    const assessment = assessmentsRepository.create({
      name,
      stars,
      message,
      date,
    });

    await assessmentsRepository.save(assessment);

    return assessment;
  }
}

export default CreateAssessmentService;
