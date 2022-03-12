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
  approved: boolean;
}

interface IRequestRandomList {
  product_id: number;
  domain: string;
  page: number;
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

@EntityRepository(Assessment)
class AssessmentRepository extends Repository<Assessment> {
  public async findById(id: string): Promise<Assessment | undefined> {
    const existsAssessment = await this.findOne(id, {
      relations: ['store'],
    });

    return existsAssessment;
  }

  public async findRandom({
    product_id,
    domain,
    page = 1,
  }: IRequestRandomList): Promise<Assessment[]> {
    const random = page > 1 ? ', random()' : '';

    const assessments = await this.manager.query(
      `select asmt.*
        from assessments asmt
        left join stores st on st.id = asmt.store_id and st.domain = '${domain}'
        where
          asmt.product_id = ${product_id}
          or asmt.product_id is null
        order by asmt.product_id, asmt.date ${random}
        limit 15 offset ${page}
      `,
    );
    return assessments;
  }

  public async createAssessment({
    name,
    stars,
    message,
    product_id,
    date,
    store,
    approved,
  }: IRequest): Promise<IResponse> {
    const assessment = this.create({
      name,
      stars,
      message,
      product_id,
      date,
      store,
      approved,
    });

    await this.save(assessment);

    return assessment;
  }
}

export default AssessmentRepository;
