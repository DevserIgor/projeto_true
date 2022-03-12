import Store from '@modules/stores/typeorm/entities/Store';
import StoreRepository from '@modules/stores/typeorm/repositories/StoresRepository';
import { getCustomRepository } from 'typeorm';
import Assessment from '../typeorm/entities/Assessment';
import AssessmentRepository from '../typeorm/repositories/AssessmentRepository';

interface IAssessmentResponse {
  name: string;
  stars: number;
  message: string;
  product_id: number;
  date: Date;
  store?: Store;
  approved: boolean;
}

interface IPaginateAssessment {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: IAssessmentResponse[];
}
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
    const storesRepository = getCustomRepository(StoreRepository);

    const assessments = assessmentsRepository.findRandom({
      product_id,
      domain,
      page,
    });

    return assessments;
  }
}

export default ListAssessmentRandomService;
