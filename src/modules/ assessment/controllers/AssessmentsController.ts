import { Request, Response } from 'express';
import CreateAssessmentService from '../services/CreateAssessmentService';
import DeleteAssessmentService from '../services/DeleteAssessmentService';
import ListAssessmentService from '../services/ListAssessmentService';
import ShowAssessmentService from '../services/ShowAssessmentService';
import UpdateAssessmentService from '../services/UpdateAssessmentService';

export default class AssessmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAssessments = new ListAssessmentService();

    const assessment = await listAssessments.execute();

    return response.json(assessment);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showAssessment = new ShowAssessmentService();

    const assessment = await showAssessment.execute({ id });
    return response.json(assessment);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, stars, message, date } = request.body;

    const createAssessment = new CreateAssessmentService();

    const assessment = await createAssessment.execute({
      name,
      stars,
      message,
      date,
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

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletAssessment = new DeleteAssessmentService();

    await deletAssessment.execute({ id });
    return response.json([]);
  }
}
