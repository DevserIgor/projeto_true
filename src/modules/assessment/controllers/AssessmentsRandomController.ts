import { Request, Response } from 'express';
import ListAssessmentRandomService from '../services/ListAssessmentRandomService';
import CreateAssessmentService from '../services/CreateAssessmentService';
import UpdateAssessmentService from '../services/UpdateAssessmentService';
import * as core from 'express-serve-static-core';

interface PaginationQuery {
  page: number;
}

interface FilterQuery extends PaginationQuery {
  product_id: number;
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

export default class AssessmentsRandomController {
  public async index(
    request: RequestFilter,
    response: Response,
  ): Promise<Response> {
    const listAssessmentsRandom = new ListAssessmentRandomService();
    const { product_id, page } = request.query;
    const { origin } = request.headers;
    const domain = product_id ? origin : undefined;

    const assessmentRandom = await listAssessmentsRandom.execute({
      product_id,
      domain,
      page,
    });

    return response.json(assessmentRandom);
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
    const { name, stars, message, date } = request.body;
    const { id } = request.params;

    const updateAssessment = new UpdateAssessmentService();

    const assessment = await updateAssessment.execute({
      id,
      name,
      message,
      stars,
      date,
    });

    return response.json(assessment);
  }
}
