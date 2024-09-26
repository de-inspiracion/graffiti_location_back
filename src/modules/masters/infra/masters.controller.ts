import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Version,
} from '@nestjs/common';
import { MastersService } from '../application/masters.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('masters')
@ApiTags('masters')
export class mastersController {
  constructor(private readonly mastersService: MastersService) {}

  @Version('1')
  @Get('gender')
  async gender(): Promise<any> {
    try {
      return await this.mastersService.getGender();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Version('1')
  @Get('countries')
  async contries(): Promise<any> {
    try {
      return await this.mastersService.getContries();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Version('1')
  @Get('profiles')
  async getProfiles(): Promise<any> {
    try {
      return await this.mastersService.getProfiles();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
