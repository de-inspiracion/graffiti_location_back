import { Test, TestingModule } from '@nestjs/testing';
import { LogsEndpointService } from './logs-endpoint.service';

describe('LogsEndpointService', () => {
  let service: LogsEndpointService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogsEndpointService],
    }).compile();

    service = module.get<LogsEndpointService>(LogsEndpointService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
