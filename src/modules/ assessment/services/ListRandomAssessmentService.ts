import { getCustomRepository } from 'typeorm';
import Assessment from '../typeorm/entities/Assessment';
import AssessmentRepository from '../typeorm/repositories/AssessmentRepository';

interface IPaginateAssessment {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Assessment[];
}

class ListRandomAssessmentService {
  public async execute(): Promise<IPaginateAssessment> {
    const assessmentsRepository = getCustomRepository(AssessmentRepository);

    const assessments = await assessmentsRepository
      .createQueryBuilder()
      .addOrderBy('random()')
      .paginate(10);

    return assessments as IPaginateAssessment;
  }
}

export default ListRandomAssessmentService;
