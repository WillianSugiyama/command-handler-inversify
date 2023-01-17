import { inject, injectable } from 'inversify';
import { Body, Controller, Get, Path, Post, Response, Route, Tags } from 'tsoa';
import { Mediator } from '../../../application/contracts/mediator';
import { FindTestByIdCommand } from '../../../application/test/find-test-by-id/find-test-by-id-command';
import { CreateTestCommand } from '../../../application/test/create-test/create-test-command';
import { HttpStatusCode } from '../../../infrastructure/http/http-status-code';
import { ErrorResult } from '../../types';
import { handleResult } from '../handle-result';

import * as Types from '../../../infrastructure/configurations/types';
import { TestDTO } from '../../../domain/dtos/test/test.dto';

@injectable()
@Route('/v1/test')
export class TestController extends Controller {
  private readonly mediator: Mediator;

  constructor(@inject(Types.Mediator) mediator: Mediator) {
    super();
    this.mediator = mediator;
  }

  @Tags('Test')
  @Get('/{id}')
  @Response<TestDTO>(HttpStatusCode.SUCCESS)
  @Response<ErrorResult>(HttpStatusCode.BAD_REQUEST)
  @Response<ErrorResult>(HttpStatusCode.INTERNAL_SERVER_ERROR)
  @Response<ErrorResult>(HttpStatusCode.NOT_FOUND)
  public async findById(@Path() id: string): Promise<TestDTO | ErrorResult> {
    const healthCheckHandlerResult = await this.mediator.send(new FindTestByIdCommand({ id }));

    const { data, statusCode } = handleResult(healthCheckHandlerResult);

    this.setStatus(statusCode);

    return data;
  }

  @Tags('Test')
  @Post('/')
  @Response<ErrorResult>(HttpStatusCode.BAD_REQUEST)
  @Response<ErrorResult>(HttpStatusCode.INTERNAL_SERVER_ERROR)
  @Response<ErrorResult>(HttpStatusCode.NOT_FOUND)
  public async save(@Body() testDTO: TestDTO): Promise<any | ErrorResult> {
    try {
      const createTestHandlerResult = await this.mediator.send(new CreateTestCommand({ task: testDTO.task }));
      const { data, statusCode } = handleResult(createTestHandlerResult);
      this.setStatus(statusCode);
      return data;
    } catch (error) {}
  }
}
