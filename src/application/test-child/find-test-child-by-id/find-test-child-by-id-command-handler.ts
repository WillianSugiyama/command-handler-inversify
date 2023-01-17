import { inject, injectable } from 'inversify';
import { TestChildEntity } from '../../../domain/entities/test/test-child-entity';
import { TestChildRepository } from '../../../domain/repositories/test/test-child-repository';
import { CommandHandler } from '../../contracts/command-handler';
import { Result } from '../../contracts/result/result';
import { FindTestChildByIdCommand } from './find-test-child-by-id-command';

@injectable()
export class FindTestChildByIdCommandHandler implements CommandHandler<FindTestChildByIdCommand, TestChildEntity> {
  @inject(TestChildRepository)
  private readonly testChildRepository!: TestChildRepository;

  public async handle(request: FindTestChildByIdCommand): Promise<Result<TestChildEntity>> {
    return await this.testChildRepository.findOne(request.id);
  }
}
