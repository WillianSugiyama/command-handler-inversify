import { ConnectionService } from '../../../infrastructure/database/config/connection-service';
import { inject, injectable } from 'inversify';
import { Result } from '../../../application/contracts/result/result';
import { ResultError } from '../../../application/contracts/result/result-error';
import { ResultNotFound } from '../../../application/contracts/result/result-not-found';
import { ResultSuccess } from '../../../application/contracts/result/result-success';
import { TestEntity } from '../../entities/test/test-entity';
import { TestDTO } from '../../dtos/test/test.dto';

@injectable()
export class TestRepository {
  constructor(
    @inject(ConnectionService)
    private readonly connectionService: ConnectionService
  ) {}

  private repository = this.connectionService.getRepo<TestEntity>(TestEntity);

  public async findOne(id: string): Promise<Result<TestEntity>> {
    try {
      const test = await (await this.repository).findOne({ where: { id } });

      if (!test) {
        return new ResultNotFound('Test not found');
      }

      return new ResultSuccess(test);
    } catch (error) {
      return new ResultError('Error at try findOne TestChild', error);
    } finally {
      this.connectionService.closeConnection();
    }
  }

  public async save(test: TestDTO): Promise<Result<TestEntity>> {
    try {
      const testChildSaved = await (
        await this.repository
      ).save({
        task: test.task,
      });

      return new ResultSuccess(testChildSaved);
    } catch (error) {
      return new ResultError('Error at save testChildSaved', error);
    } finally {
      this.connectionService.closeConnection();
    }
  }
}
