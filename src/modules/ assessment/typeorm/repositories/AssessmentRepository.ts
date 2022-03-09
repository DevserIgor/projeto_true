import Store from '@modules/stores/typeorm/entities/Store';
import { EntityRepository, Repository } from 'typeorm';
import Assessment from '../entities/Assessment';

interface IRequest {
  name: string;
  stars: number;
  message: string;
  product_id: number;
  date: Date;
  store?: Store;
}

interface IResponse {
  name: string;
  stars: number;
  message: string;
  product_id: number;
  date: Date;
  store?: Store;
}

@EntityRepository(Assessment)
class AssessmentRepository extends Repository<Assessment> {
  public async findById(id: string): Promise<Assessment | undefined> {
    const existsAssessment = await this.findOne(id, {
      relations: ['store'],
    });

    return existsAssessment;
  }

  public async createAssessment({
    name,
    stars,
    message,
    product_id,
    date,
    store,
  }: IRequest): Promise<IResponse> {
    const assessment = this.create({
      name,
      stars,
      message,
      product_id,
      date,
      store,
    });

    await this.save(assessment);

    return assessment;
  }
}

export default AssessmentRepository;
