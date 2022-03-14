import { Request, Response } from 'express';
import CreateAssessmentService from '../services/CreateAssessmentService';
import DeleteAssessmentService from '../services/DeleteAssessmentService';
import ListAssessmentService from '../services/ListAssessmentService';
import ShowAssessmentService from '../services/ShowAssessmentService';
import UpdateAssessmentService from '../services/UpdateAssessmentService';
import * as core from 'express-serve-static-core';
interface PaginationQuery {
  page: string;
}

interface FilterQuery extends PaginationQuery {
  name: string;
  stars: number;
  message: string;
  approved: boolean;
  dateStart: Date;
  dateEnd: Date;
}
interface RequestFilter
  extends Request<
    core.ParamsDictionary,
    any,
    any,
    FilterQuery,
    Record<string, any>
  > {
  query: FilterQuery;
}

export default class AssessmentsController {
  public async index(
    request: RequestFilter,
    response: Response,
  ): Promise<Response> {
    const { name, stars, message, approved, dateStart, dateEnd } =
      request.query;
    const listAssessments = new ListAssessmentService();

    const assessment = await listAssessments.execute({
      name,
      stars,
      message,
      approved,
      dateStart,
      dateEnd,
    });

    return response.json(assessment);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showAssessment = new ShowAssessmentService();

    const assessment = await showAssessment.execute({ id });
    return response.json(assessment);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, stars, message, date, product_id, approved } = request.body;
    const { origin } = request.headers;
    const domain = product_id ? origin : '';
    const createAssessment = new CreateAssessmentService();

    const assessment = await createAssessment.execute({
      name,
      stars,
      message,
      product_id,
      domain,
      date,
      approved: !!approved,
    });

    return response.json(assessment);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, stars, message, approved, date } = request.body;
    const { id } = request.params;

    const updateAssessment = new UpdateAssessmentService();

    const assessment = await updateAssessment.execute({
      id,
      name,
      message,
      approved,
      stars,
      date,
    });

    return response.json(assessment);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletAssessment = new DeleteAssessmentService();

    await deletAssessment.execute({ id });
    return response.json([]);
  }
}
