import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Headers,
  Post,
  Query,
  Version,
  Req,
  Param,
  Inject,
} from '@nestjs/common';
import { RegisterRefService } from '../../application/registerRef.usecase';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegistryRefDTO } from '../DTOs/refRegistry.dto';
import { RegisterRefDataResp } from '../../domain/interfaces/registerRefDataResp.interface';
import { RegistryRefStateUpdateDTO } from '../DTOs/refRegistryStateUpdate.dto';
import { ExistRegisterDTO } from '../DTOs/refExistRegister.dto';
import { Request as ExpressRequest } from 'express';

@Controller('ref')
@ApiTags('ref')
export class postController {
  constructor(private readonly registerRefService: RegisterRefService) {}

  @Post('registry')
  @Version('1')
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiOperation({ summary: 'registerRef' })
  async addRef(
    @Body() data: RegistryRefDTO,
    @Req() req: ExpressRequest,
  ): Promise<RegisterRefDataResp> {
    try {
      return await this.registerRefService.addRegister(data, req);
    } catch (error) {
      throw new HttpException(
        { response: error.response, status: error.status },
        error.status,
      );
    }
  }

  @Get('registry')
  @Version('1')
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiOperation({ summary: 'registerRef' })
  async getRegistry(@Query('state') state): Promise<RegisterRefDataResp> {
    try {
      return await this.registerRefService.getRegister(state);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('registry/email/auth')
  @Version('1')
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiOperation({ summary: 'registerRef' })
  async verifyEmailRegistry(
    @Query('token') token,
  ): Promise<RegisterRefDataResp> {
    try {
      return await this.registerRefService.verifyEmail(token);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('registry/changePassword')
  @Version('1')
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiOperation({ summary: 'registerRef' })
  async changePassword(@Query('email') email): Promise<any> {
    try {
      const resultToken = await this.registerRefService.changePassword(email);
      return { status: 'ok', payload: {} };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('registry/state')
  @Version('1')
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiOperation({ summary: 'registerRef' })
  async updateStateRegistry(
    @Body() body: RegistryRefStateUpdateDTO,
  ): Promise<RegisterRefDataResp> {
    try {
      return await this.registerRefService.updateStateRegister(
        body.id,
        body.state,
      );
    } catch (error) {
      throw new HttpException(
        { response: error.response, status: error.status },
        error.status,
      );
    }
  }

  @Version('1')
  @Get('/info')
  async getRef(@Headers('user') email: string): Promise<any> {
    try {
      return await this.registerRefService.getRefs(email);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Version('1')
  @Post('existsRegister')
  async existsRegister(@Body() body: ExistRegisterDTO): Promise<any> {
    try {
      return await this.registerRefService.existsRegister(body);
    } catch (error) {
      throw new HttpException(
        { response: error.response, status: error.status },
        error.status,
      );
    }
  }
}
