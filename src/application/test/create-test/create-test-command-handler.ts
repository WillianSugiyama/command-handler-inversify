import { inject, injectable } from 'inversify';
import { TestEntity } from '../../../domain/entities/test/test-entity';
import { TestRepository } from '../../../domain/repositories/test/test-repository';
import { CommandHandler } from '../../contracts/command-handler';
import { Result } from '../../contracts/result/result';
import { CreateTestCommand } from './create-test-command';

@injectable()
export class CreateTestCommandHandler implements CommandHandler<CreateTestCommand, TestEntity> {
  @inject(TestRepository)
  private readonly testRepository!: TestRepository;

  public async handle(request: CreateTestCommand): Promise<Result<TestEntity>> {
    return await this.testRepository.save({
      task: request.task,
    });
  }
}
