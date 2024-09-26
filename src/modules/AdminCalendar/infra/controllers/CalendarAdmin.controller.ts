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
import { CalendarAdminService } from '../../application/calendarAdmin.usecase';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CalendarAdminEventsDTO,
  CalendarAdminGetEventsDTO,
  eventToRef,
} from '../DTOs/calendarAdminEvent.dto';
import { CalendarAdminDataResp } from '../../domain/interfaces/calendarAdminDataResp.interface';

@Controller('admin/events')
@ApiTags('calendarAdmin')
export class CalendarAdminController {
  constructor(private readonly calendarAdminService: CalendarAdminService) {}

  @Post('')
  @Version('1')
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiOperation({ summary: 'calendarAdmin' })
  async addEvent(
    @Body() data: CalendarAdminEventsDTO,
    @Headers('user') user: string,
  ): Promise<CalendarAdminDataResp> {
    try {
      data.user = user;
      return await this.calendarAdminService.addEvent(data);
    } catch (error) {
      throw new HttpException(
        { response: error.response, status: error.status },
        error.status,
      );
    }
  }

  @Post('ref')
  @Version('1')
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiOperation({ summary: 'calendarAdmin' })
  async approveEventToRef(
    @Body() data: eventToRef,
    @Headers('user') user: string,
  ): Promise<CalendarAdminDataResp> {
    try {
      return await this.calendarAdminService.approveEventToRef(data);
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
  ): Promise<CalendarAdminDataResp> {
    try {
      return await this.calendarAdminService.getAllEventsForDate(data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  @Version('1')
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiOperation({ summary: 'updateStateRegistry' })
  async updateStateRegistry(
    @Body() body: CalendarAdminEventsDTO,
    @Param('id') id: string,
  ): Promise<CalendarAdminDataResp> {
    try {
      return await this.calendarAdminService.updateEvent(id, body);
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
  async deleteEvent(@Param('id') id: string): Promise<CalendarAdminDataResp> {
    try {
      return await this.calendarAdminService.deleteEvent(id);
    } catch (error) {
      throw new HttpException(
        { response: error.response, status: error.status },
        error.status,
      );
    }
  }
}
