import {
  Body,
  Controller,
  HttpException,
  Headers,
  Post,
  Version,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CalendarAdminDataResp } from '../../domain/interfaces/calendarAdminDataResp.interface';
import { eventNotificationDTO } from '../DTOs/pushNotification.dto';
import { NotificationService } from '../../application/notification.usecase';

@Controller('admin/notification')
@ApiTags('notification')
export class NotificationAdminController {
  constructor(private readonly notificationAdminService: NotificationService) {}

  @Post('push')
  @Version('1')
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiOperation({ summary: 'calendarAdmin' })
  async sendNotificationPush(
    @Body() data: eventNotificationDTO,
    @Headers('user') user?: string,
  ): Promise<CalendarAdminDataResp> {
    try {
      return await this.notificationAdminService.sendNotificationPush(data);
    } catch (error) {
      throw new HttpException(
        { response: error.response, status: error.status },
        error.status,
      );
    }
  }
}
