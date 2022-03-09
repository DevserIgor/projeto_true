import { EntityRepository, Repository } from 'typeorm';
import Assessment from '../entities/Assessment';

@EntityRepository(Assessment)
class AssessmentRepository extends Repository<Assessment> {
  public async findById(id: string): Promise<Assessment | undefined> {
    const existsAssessment = await this.findOne(id, {
      relations: ['store'],
    });

    return existsAssessment;
  }
}

export default AssessmentRepository;
