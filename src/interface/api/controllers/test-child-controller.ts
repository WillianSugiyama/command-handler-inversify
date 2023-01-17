import { inject, injectable } from 'inversify';
import { Body, Controller, Get, Path, Post, Response, Route, Tags } from 'tsoa';
import { Mediator } from '../../../application/contracts/mediator';
import { FindTestChildByIdCommand } from '../../../application/test-child/find-test-child-by-id/find-test-child-by-id-command';
import { CreateTestChildCommand } from '../../../application/test-child/create-test-child/create-test-child-by-id-command';
import { HttpStatusCode } from '../../../infrastructure/http/http-status-code';
import { ErrorResult } from '../../types';
import { handleResult } from '../handle-result';

import * as Types from '../../../infrastructure/configurations/types';
import { TestChildDTO } from '../../../domain/dtos/test/test-child-dto';

@injectable()
@Route('/v1/test-child')
export class TestChildController extends Controller {
  private readonly mediator: Mediator;

  constructor(@inject(Types.Mediator) mediator: Mediator) {
    super();
    this.mediator = mediator;
  }

  @Tags('Test Child')
  @Get('/{id}')
  @Response<TestChildDTO>(HttpStatusCode.SUCCESS)
  @Response<ErrorResult>(HttpStatusCode.BAD_REQUEST)
  @Response<ErrorResult>(HttpStatusCode.INTERNAL_SERVER_ERROR)
  @Response<ErrorResult>(HttpStatusCode.NOT_FOUND)
  public async findById(@Path() id: string): Promise<TestChildDTO | ErrorResult> {
    const healthCheckHandlerResult = await this.mediator.send(new FindTestChildByIdCommand({ id }));

    const { data, statusCode } = handleResult(healthCheckHandlerResult);

    this.setStatus(statusCode);

    return data;
  }

  @Tags('Test Child')
  @Post('/')
  @Response<ErrorResult>(HttpStatusCode.BAD_REQUEST)
  @Response<ErrorResult>(HttpStatusCode.INTERNAL_SERVER_ERROR)
  @Response<ErrorResult>(HttpStatusCode.NOT_FOUND)
  public async save(@Body() testChildDTO: TestChildDTO): Promise<any | ErrorResult> {
    try {
      const createTestHandlerResult = await this.mediator.send(new CreateTestChildCommand({ testId: testChildDTO.id, value: 'Teste' }));
      const { data, statusCode } = handleResult(createTestHandlerResult);
      this.setStatus(statusCode);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
