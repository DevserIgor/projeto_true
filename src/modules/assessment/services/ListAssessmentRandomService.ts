import Store from '@modules/stores/typeorm/entities/Store';
import StoreRepository from '@modules/stores/typeorm/repositories/StoresRepository';
import { getCustomRepository } from 'typeorm';
import Assessment from '../typeorm/entities/Assessment';
import AssessmentRepository from '../typeorm/repositories/AssessmentRepository';
interface IFiltersQuery {
  product_id?: number;
  domain?: string;
  page: number | 1;
}

class ListAssessmentRandomService {
  public async execute({
    product_id,
    domain,
    page,
  }: IFiltersQuery): Promise<Assessment[]> {
    const assessmentsRepository = getCustomRepository(AssessmentRepository);

    const assessments = assessmentsRepository.findRandom({
      product_id,
      domain,
      page,
    });

    return assessments;
  }
}

export default ListAssessmentRandomService;
