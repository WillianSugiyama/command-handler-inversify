import { inject, injectable } from 'inversify';
import { Result } from '../../../application/contracts/result/result';
import { ResultError } from '../../../application/contracts/result/result-error';
import { ResultNotFound } from '../../../application/contracts/result/result-not-found';
import { ResultSuccess } from '../../../application/contracts/result/result-success';
import { TestChildEntity } from '../../entities/test/test-child-entity';
import { TestChildDTO } from '../../dtos/test/test-child-dto';
import { TestEntity } from '../../entities/test/test-entity';

import * as Types from '../../../infrastructure/configurations/types';
import { IConnectionService } from '../../../infrastructure/database/config/interfaces/connection-service-interface';
@injectable()
export class TestChildRepository {
  constructor(
    @inject(Types.IConnectionService)
    private readonly connectionService: IConnectionService
  ) {}

  private repository = this.connectionService.getRepo<TestChildEntity>(TestChildEntity);

  public async findOne(id: string): Promise<Result<TestChildEntity>> {
    try {
      const testChild = await (await this.repository).findOne({ where: { id } });

      if (!testChild) {
        return new ResultNotFound('Test not found');
      }

      return new ResultSuccess(testChild);
    } catch (error) {
      return new ResultError('Error at try findOne TestChild', error);
    } finally {
      this.connectionService.closeConnection();
    }
  }

  public async save(testChild: TestChildDTO, test: TestEntity): Promise<Result<TestChildEntity>> {
    try {
      const testChildSaved = await (
        await this.repository
      ).save({
        value: testChild.value,
        test,
      });

      return new ResultSuccess(testChildSaved);
    } catch (error) {
      console.log('ERROR', error);
      return new ResultError('Error at save testChildSaved', { error });
    } finally {
      this.connectionService.closeConnection();
    }
  }
}
