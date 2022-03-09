import StoreRepository from '@modules/stores/typeorm/repositories/StoresRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Assessment from '../typeorm/entities/Assessment';
import AssessmentRepository from '../typeorm/repositories/AssessmentRepository';

interface IRequest {
  name: string;
  stars: number;
  message: string;
  product_id: number;
  domain?: string;
  date: Date;
}
class CreateAssessmentService {
  public async execute({
    name,
    stars,
    message,
    product_id,
    domain,
    date,
  }: IRequest): Promise<Assessment> {
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
    });

    return assessment;
  }
}

export default CreateAssessmentService;
