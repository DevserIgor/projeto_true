import { Between, getCustomRepository, ILike } from 'typeorm';
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

interface IFiltersQuery {
  name: string;
  stars: number;
  message: string;
  dateStart: Date;
  dateEnd: Date;
}

class ListAssessmentService {
  public async execute({
    name,
    stars,
    message,
    dateStart,
    dateEnd,
  }: IFiltersQuery): Promise<IPaginateAssessment> {
    const assessmentsRepository = getCustomRepository(AssessmentRepository);

    const queryBuilder = assessmentsRepository.createQueryBuilder();

    if (stars) {
      queryBuilder.where({ stars });
    }

    if (name) {
      queryBuilder.where({
        name: ILike(`%${name}%`),
      });
    }

    if (message) {
      queryBuilder.where({
        message: ILike(`%${message}%`),
      });
    }

    if (dateStart && dateEnd) {
      queryBuilder.where({
        date: Between(`${dateStart} 00:00:00`, `${dateEnd} 23:59:59`),
      });
    }
    const assessments = await queryBuilder
      .addOrderBy('date', 'DESC')
      .addOrderBy('name', 'ASC')
      .paginate(5);

    return assessments as IPaginateAssessment;
  }
}

export default ListAssessmentService;
