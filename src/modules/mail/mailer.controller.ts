import {
  Controller,
  Get,
  Query,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { MailerService } from './mailer.service';
import { Request as ExpressRequest } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { Templates } from 'src/shared/enums/templates';

@Controller('mail')
@ApiTags('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Get('test')
  async sendTestEmail(
    @Query('email') email: string,
    @Req() req: ExpressRequest,
  ): Promise<string> {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    const token = 'test-token';
    try {
      const path = `/v1/ref/registry/email/auth`;
      const appDomain = `${req.protocol}://${req.get('host')}`;
      const url = `${appDomain}${path}`;
      const template = Templates.VERIFY_EMAIL;
      const subject = 'Verifica tu correo electrónico';
      await this.mailerService.sendVerificationEmail(
        email,
        url,
        template,
        subject,
      );
    } catch (error) {
      console.log('error mailer', error);
    }
    return `Test email sent to ${email}`;
  }
}
