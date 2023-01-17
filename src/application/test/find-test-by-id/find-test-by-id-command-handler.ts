import { inject, injectable } from 'inversify';
import { TestDTO } from '../../../domain/dtos/test/test.dto';
import { TestRepository } from '../../../domain/repositories/test/test-repository';
import { CommandHandler } from '../../contracts/command-handler';
import { Result } from '../../contracts/result/result';
import { FindTestByIdCommand } from './find-test-by-id-command';

@injectable()
export class FindTestByIdCommandHandler implements CommandHandler<FindTestByIdCommand, TestDTO> {
  @inject(TestRepository)
  private readonly testChildRepository!: TestRepository;

  public async handle(request: FindTestByIdCommand): Promise<Result<TestDTO>> {
    return await this.testChildRepository.findOne(request.id);
  }
}
