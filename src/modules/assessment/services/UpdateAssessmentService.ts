import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Assessment from '../typeorm/entities/Assessment';
import AssessmentRepository from '../typeorm/repositories/AssessmentRepository';

interface IRequest {
  id: string;
  name: string;
  stars: number;
  message: string;
  approved: boolean;
  date: Date;
}
class UpdateAssessmentService {
  public async execute({
    id,
    name,
    message,
    approved,
    stars,
    date,
  }: IRequest): Promise<Assessment> {
    const assessmentsRepository = getCustomRepository(AssessmentRepository);

    const assessment = await assessmentsRepository.findOne(id);
    if (!assessment) {
      throw new AppError('Avaliação não encontrada.');
    }

    assessment.name = name;
    assessment.message = message;
    assessment.approved = approved;
    assessment.stars = stars;
    assessment.date = date;

    await assessmentsRepository.save(assessment);

    return assessment;
  }
}

export default UpdateAssessmentService;
