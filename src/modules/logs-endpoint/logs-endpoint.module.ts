import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogsEndpointController } from './logs-endpoint.controller';
import { LoggerClientServicesTrx } from '../../shared/logger/logger.client';
import { Log, LogSchema } from './schemas/log.schema';
import { LogEndpointService } from './logs-endpoint.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }])],
  controllers: [LogsEndpointController],
  providers: [
    LogEndpointService,
    LoggerClientServicesTrx
  ],
  exports: [LogEndpointService],
})
export class LogsEndpointModule { }
