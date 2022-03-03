import {
  Between,
  getCustomRepository,
  ILike,
  LessThan,
  MoreThan,
} from 'typeorm';
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

    let where: any = {};

    if (stars) {
      where = { ...where, stars };
    }

    if (name) {
      where = { ...where, name: ILike(`%${name}%`) };
    }

    if (message) {
      where = { ...where, message: ILike(`%${message}%`) };
    }

    if (dateStart) {
      where = {
        ...where,
        date: MoreThan(`${dateStart} 00:00:00`),
      };
    }
    if (dateEnd) {
      where = {
        ...where,
        date: LessThan(`${dateEnd} 23:59:59`),
      };
    }

    const assessments = await queryBuilder
      .where(where)
      .addOrderBy('date', 'DESC')
      .addOrderBy('name', 'ASC')
      .paginate(5);

    return assessments as IPaginateAssessment;
  }
}

export default ListAssessmentService;
