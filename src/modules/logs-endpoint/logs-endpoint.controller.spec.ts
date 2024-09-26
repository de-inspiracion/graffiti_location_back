import { Test, TestingModule } from '@nestjs/testing';
import { LogsEndpointController } from './logs-endpoint.controller';
import { LogsEndpointService } from './logs-endpoint.service';

describe('LogsEndpointController', () => {
  let controller: LogsEndpointController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogsEndpointController],
      providers: [LogsEndpointService],
    }).compile();

    controller = module.get<LogsEndpointController>(LogsEndpointController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
