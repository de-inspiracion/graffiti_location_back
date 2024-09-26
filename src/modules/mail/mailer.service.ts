import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
import { Request } from 'express';
import { Templates } from 'src/shared/enums/templates';

@Injectable()
export class MailerService {
  constructor(private readonly mailerService: NestMailerService) {}

  async sendVerificationEmail(
    email: string,
    url: string,
    template: Templates,
    subject: string
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: subject,
      template: template,
      context: { url },
    });
  }
}
