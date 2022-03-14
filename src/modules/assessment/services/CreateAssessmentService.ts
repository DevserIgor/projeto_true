import Store from '@modules/stores/typeorm/entities/Store';
import StoreRepository from '@modules/stores/typeorm/repositories/StoresRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import AssessmentRepository from '../typeorm/repositories/AssessmentRepository';

interface IRequest {
  name: string;
  stars: number;
  message: string;
  product_id: number;
  domain?: string;
  date: Date;
  approved: boolean;
}

interface IResponse {
  name: string;
  stars: number;
  message: string;
  product_id: number;
  date: Date;
  store?: Store;
  approved: boolean;
}
class CreateAssessmentService {
  public async execute({
    name,
    stars,
    message,
    product_id,
    domain,
    date,
    approved,
  }: IRequest): Promise<IResponse> {
    const assessmentsRepository = getCustomRepository(AssessmentRepository);
    const storesRepository = getCustomRepository(StoreRepository);

    const storeExists = domain
      ? await storesRepository.findByDomain(domain)
      : undefined;

    const assessment = assessmentsRepository.createAssessment({
      name,
      stars,
      message,
      product_id,
      date,
      store: storeExists,
      approved,
    });

    return assessment;
  }
}

export default CreateAssessmentService;
