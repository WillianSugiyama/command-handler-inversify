import { Container, decorate, injectable } from 'inversify';
import { Controller } from 'tsoa';
import { Mediator } from '../../application/contracts/mediator';
import { HealthcheckCommandHandler } from '../../application/healthcheck/healthcheck-command-handler';
import { HealthCheckController } from '../../interface/api/controllers/healthcheck-controller';
import { BodyParserMiddleware } from '../../interface/api/middlewares/body-parser-middleware';
import { CorsMiddleware } from '../../interface/api/middlewares/cors-middleware';
import { ErrorMiddleware } from '../../interface/api/middlewares/error-middleware';
import { ProcessHttpRequest } from '../../interface/api/process-http-request';
import { ConnectionService } from '../database/config/connection-service';
import { CreateTestCommandHandler } from '../../application/test/create-test/create-test-command-handler';
import { FindTestByIdCommandHandler } from '../../application/test/find-test-by-id/find-test-by-id-command-handler';
import { CreateTestChildByIdCommandHandler } from '../../application/test-child/create-test-child/create-test-child-by-id-command-handler';
import { FindTestChildByIdCommandHandler } from '../../application/test-child/find-test-child-by-id/find-test-child-by-id-command-handler';
import { Settings } from './settings';

import * as Types from './types';
import { TestController } from '../../interface/api/controllers/test-controller';
import { TestRepository } from '../../domain/repositories/test/test-repository';
import { TestChildRepository } from '../../domain/repositories/test/test-child-repository';
import { TestChildController } from '../../interface/api/controllers/test-child-controller';
import { IConnectionService } from '../database/config/interfaces/connection-service-interface';

const container: Container = new Container();

decorate(injectable(), Controller);

// contracts
container.bind(Types.Mediator).to(Mediator);

// interface
container.bind(ProcessHttpRequest).toSelf();
container.bind(BodyParserMiddleware).toSelf();
container.bind(ErrorMiddleware).toSelf();
container.bind(CorsMiddleware).toSelf();

// controllers
container.bind(HealthCheckController).toSelf();
container.bind(TestController).toSelf();
container.bind(TestChildController).toSelf();

// settings
container.bind(Settings).toSelf();
container.bind<IConnectionService>(Types.IConnectionService).to(ConnectionService);

// values
container.bind(Types.Container).toConstantValue(container);
container.bind(Types.Envs).toConstantValue(process.env);

// handlers
container.bind(Types.HealthcheckCommandHandler).to(HealthcheckCommandHandler);
container.bind(Types.CreateTestChildCommandHandler).to(CreateTestChildByIdCommandHandler);
container.bind(Types.CreateTestCommandHandler).to(CreateTestCommandHandler);
container.bind(Types.FindTestByIdCommandHandler).to(FindTestByIdCommandHandler);
container.bind(Types.FindTestChildByIdCommandHandler).to(FindTestChildByIdCommandHandler);

//repositores
container.bind(TestRepository).toSelf();
container.bind(TestChildRepository).toSelf();

// database

export { container, container as iocContainer };
