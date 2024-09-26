import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerService } from './mailer.service';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailerController } from './mailer.controller';

@Module({
  imports: [
    ConfigModule,
    NestMailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          port: configService.get<number>('MAIL_PORT'),
          // secure: configService.get<boolean>('MAIL_SECURE'),
          secure: false,
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASS'),
          },
          tls: {
            rejectUnauthorized: false,
          },
        },
        defaults: {
          from: configService.get<string>('MAIL_FROM'),
        },
        template: {
          // dir: join(__dirname, 'templates'),
          dir: join(process.cwd(), 'src/modules/mail/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailerService],
  controllers: [MailerController],
  exports: [MailerService],
})
export class MailerModule {}
