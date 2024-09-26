import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Headers,
  Param,
  Post,
  Query,
  Version,
  Put,
  Delete,
} from '@nestjs/common';
import { CalendarEventRefService } from '../../application/calendarRef.usecase';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CalendarAdminEventsDTO,
  CalendarAdminGetEventsDTO,
  myEventsDTO,
} from '../DTOs/calendarAdminEvent.dto';
import { CalendarRefDataResp } from '../../domain/interfaces/calendarRefDataResp.interface';
import { ObservationDTO } from '../DTOs/observations.dto';

@Controller('ref/events')
@ApiTags('calendarRef')
export class CalendarRefController {
  constructor(private readonly calendarRefService: CalendarEventRefService) {}

  @Post('')
  @Version('1')
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiOperation({ summary: 'calendarRef' })
  async addEvent(
    @Body() data: CalendarAdminEventsDTO,
    @Headers('user') ref: string,
  ): Promise<CalendarRefDataResp> {
    try {
      // sacar correo desde el token
      data.user = ref;
      return await this.calendarRefService.addEvent(data);
    } catch (error) {
      throw new HttpException(
        { response: error.response, status: error.status },
        error.status,
      );
    }
  }

  @Get('')
  @Version('1')
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getAllEventsForDate(
    @Query() data: CalendarAdminGetEventsDTO,
    @Headers('user') ref: string,
  ): Promise<CalendarRefDataResp> {
    try {
      data.user = ref;
      return await this.calendarRefService.getAllEventsForDate(data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // @Put(':id')
  // @Version('1')
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // @ApiOperation({ summary: 'updateStateRegistry' })
  // async updateStateRegistry(
  //   @Body() body: CalendarAdminEventsDTO,
  //   @Param('id') id: string,
  // ): Promise<CalendarRefDataResp> {
  //   try {
  //     return await this.calendarRefService.updateEvent(id, body);
  //   } catch (error) {
  //     throw new HttpException(
  //       { response: error.response, status: error.status },
  //       error.status,
  //     );
  //   }
  // }

  @Put(':id/observations')
  @Version('1')
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiOperation({ summary: 'updateStateRegistry' })
  async updateStateRegistry(
    @Body() body: ObservationDTO,
    @Param('id') id: string,
  ): Promise<CalendarRefDataResp> {
    try {
      return await this.calendarRefService.addObservations(id, body);
    } catch (error) {
      throw new HttpException(
        { response: error.response, status: error.status },
        error.status,
      );
    }
  }

  @Delete(':id')
  @Version('1')
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiOperation({ summary: 'deleteEvent' })
  async deleteEvent(@Param('id') id: string): Promise<CalendarRefDataResp> {
    try {
      return await this.calendarRefService.deleteEvent(id);
    } catch (error) {
      throw new HttpException(
        { response: error.response, status: error.status },
        error.status,
      );
    }
  }

  @Put(':id/finish')
  @Version('1')
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiOperation({ summary: 'deleteEvent' })
  async finishEvent(@Param('id') id: string): Promise<CalendarRefDataResp> {
    try {
      return await this.calendarRefService.finishEvent(id);
    } catch (error) {
      throw new HttpException(
        { response: error.response, status: error.status },
        error.status,
      );
    }
  }

  @Get('myEvents')
  @Version('1')
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getMyEvents(
    @Query() data: myEventsDTO,
    @Headers('user') ref: string,
  ): Promise<CalendarRefDataResp> {
    try {
      data.user = ref;
      return await this.calendarRefService.myevents(data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @Version('1')
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getEventById(@Param('id') id: string): Promise<CalendarRefDataResp> {
    try {
      return await this.calendarRefService.getEvent(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
