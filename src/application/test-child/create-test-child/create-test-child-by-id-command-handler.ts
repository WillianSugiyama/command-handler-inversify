import { inject, injectable } from 'inversify';
import { TestChildEntity } from '../../../domain/entities/test/test-child-entity';
import { TestChildRepository } from '../../../domain/repositories/test/test-child-repository';
import { TestRepository } from '../../../domain/repositories/test/test-repository';
import { CommandHandler } from '../../contracts/command-handler';
import { Result } from '../../contracts/result/result';
import { ResultNotFound } from '../../contracts/result/result-not-found';
import { ResultStatusEnum } from '../../contracts/result/result-status-enum';
import { CreateTestChildCommand } from './create-test-child-by-id-command';

@injectable()
export class CreateTestChildByIdCommandHandler implements CommandHandler<CreateTestChildCommand, TestChildEntity> {
  @inject(TestChildRepository)
  private readonly testChildRepository!: TestChildRepository;

  @inject(TestRepository)
  private readonly testRepository!: TestRepository;

  public async handle(request: CreateTestChildCommand): Promise<Result<TestChildEntity>> {
    const test = await this.testRepository.findOne(request.testId);

    if (test.isError) {
      return new ResultNotFound('Test not found');
    }

    if (test.status === ResultStatusEnum.SUCCESS) {
      return await this.testChildRepository.save(
        {
          value: request.value,
        },
        test.data
      );
    }

    return null;
  }
}
