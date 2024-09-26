import { Module } from '@nestjs/common';
import { RegisterRefService } from './application/registerRef.usecase';
import { postController } from './infra/controllers/registerRef.controller';
import { LoggerClientServicesTrx } from '../../shared/logger/logger.client';
import { MongoService } from './infra/db/mongoServices';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisterRef, RegisterRefSchema } from './infra/db/registerRef.schema';
import { FirebaseService } from './infra/externalServices/firebase.service';
import { mainModule } from 'process';
import { MailerModule } from '../mail/mailer.module';
import { FirebaseAuthModule } from 'src/services/firebaseAuth/firebaseAuth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RegisterRef.name, schema: RegisterRefSchema },
    ]),
    MailerModule,
    FirebaseAuthModule,
  ],
  controllers: [postController],
  providers: [
    RegisterRefService,
    LoggerClientServicesTrx,
    FirebaseService,
    { provide: 'RegisterRefServices', useClass: MongoService },
  ],
  exports: [],
})
export class RegisterRefModule {}
