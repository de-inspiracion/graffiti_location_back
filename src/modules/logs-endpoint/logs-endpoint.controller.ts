import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DateDto } from './dto/date.dto';
import { LogEndpointService } from './logs-endpoint.service';
import { LogDto } from './dto/log.dto';

@Controller('logsendpoint')
@ApiTags('logs')
export class LogsEndpointController {

  constructor(private readonly logEndpointService: LogEndpointService) { }

  @Get('logs')
  @ApiResponse({ status: 201, description: 'Listado exitoso de logs.' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
  getLogs() {
    return this.logEndpointService.findAll();
  }

  @Post('logs-by-date')
  @ApiResponse({ status: 201, description: 'Listado de logs por fecha.' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
  getLogsByDate(@Body() dateDto: DateDto) {
    console.log(dateDto);
    return this.logEndpointService.findByDate(dateDto);
  }

  @Post('logs')
  @ApiBody({ type: LogDto })
  @ApiResponse({ status: 201, description: 'Log creado con éxito.' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
  createLog(@Body() log: LogDto) {
    return this.logEndpointService.create(log);
  }

  @Delete('logs')
  @ApiResponse({ status: 201, description: 'Logs eliminados con éxito.' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
  deleteLogs() {
    return this.logEndpointService.deleteAll();
  }

  // @UseGuards(AuthGuard)
  // @ApiBearerAuth()
  // @Get('logs-firebase')
  // getLogsFirebase() {
  //   return this.loggerClientService.getAllLogs();
  // }
  // @UseGuards(AuthGuard)
  // @ApiBearerAuth()
  // @Post('logs-by-date-firebase')
  // getLogsByDateFirebase(@Body() dateDto: DateDto) {
  //   return this.loggerClientService.getLogsByDate(dateDto);
  // }
  // @Delete('logs-firebase')
  // deleteLogsFirebase() {
  //   return this.loggerClientService.deleteAllLogs();
  // }
}
