import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { RegisterRefData } from '../domain/interfaces/registerRefData.interface';
import { DataBaseI } from '../domain/interfaces/database.interface';
import { postResponseAdapter } from '../domain/adapters/registerRef.adapter';
import { RegisterRefDataResp } from '../domain/interfaces/registerRefDataResp.interface';
import { FirebaseService } from '../infra/externalServices/firebase.service';
import { Notification } from 'src/services/notification/notification';
import { MailerService } from 'src/modules/mail/mailer.service';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Cron } from '@nestjs/schedule';
import { app } from 'firebase-admin';
import { Templates } from 'src/shared/enums/templates';
@Injectable()
export class RegisterRefService {
  private readonly NAME = 'RegisterRef';
  private logger: Logger = new Logger(RegisterRefService.name);
  notification: Notification;
  constructor(
    @Inject('RegisterRefServices') private services: DataBaseI,
    private readonly mailerService: MailerService,
    private firebaseService: FirebaseService,
    @Inject('FIREBASE_AUTH_APP') private firebaseApp: app.App,
  ) {
    this.notification = new Notification();
  }

  @Cron('0 3 * * *')
  async deleteRegisterNotVerified() {
    console.log('Called when the current second is 45');
    const result = await this.services.getRegistersQuery({
      emailVerified: false,
    });

    for (let i = 0; i < result.length; i++) {
      const fecha1 = new Date(result[0].createdAt);
      const fecha2 = new Date();
      const diferencia = fecha2.getTime() - fecha1.getTime();
      const horasPorDia = 60 * 60 * 1000;
      const diferenciaEnDias = diferencia / horasPorDia;
      if (diferenciaEnDias > 12) {
        await this.services.findAndDeleteRegister(result[i]._id);
      }
    }
    this.logger.debug('Register deleted');
  }

  async verifyEmail(token: string): Promise<any> {
    const response = await this.services.verifyEmailRegistry(token);
    if (response) {
      await this.services.updateRegisterVerifyEmail(response._id);
    } else {
      throw new HttpException(
        { response: 'token no encontrado', status: 401 },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return { status: 'ok', payload: { emailVerified: true } };
  }

  async addRegister(
    data: RegisterRefData,
    req: Request,
  ): Promise<RegisterRefDataResp> {
    const uuid = uuidv4();
    data['emailVerifytoken'] = uuid;
    data.password = data.password;
    data.dni = data.dni.replace(/[.-]/g, '');
    this.addTopics(data);
    await this.notification.sendNotification(
      'Registro exitoso',
      'Te avisaremos cuando tu cuenta haya sido revisada',
      data.topics.emailFormat,
    );

    await this.notification.sendNotification(
      'Registro de arbitro',
      'Se ha registrado un nuevo arbitro, se encuentra a la espera de tu revisión',
      data.topics.emailFormat,
    );
    const response = await this.services.addRegister(data);
    try {
      const path = `/v1/ref/registry/email/auth?token=${uuid}`;
      const appDomain = `${req.protocol}://${req.get('host')}`;
      const url = `${appDomain}${path}`;
      const template = Templates.VERIFY_EMAIL;
      const subject = 'Verifica tu correo electrónico';
      await this.mailerService.sendVerificationEmail(
        data.email,
        url,
        template,
        subject,
      );
    } catch (error) {
      console.error('error mailer', error, data.email);
    }
    const adapterResponse = postResponseAdapter(response);
    return { status: 'ok', payload: adapterResponse };
  }

  addTopics(data) {
    const country = data.country.toLowerCase();
    const city = data.city.toLowerCase();
    const email = data.email.toLowerCase();
    const emailFormat = email.replace(/@/g, '-');
    const profile = data.profile ? data.profile.toLowerCase() : 'ref';
    data['topics'] = { country, city, emailFormat, profile };
    return data;
  }

  async getRegister(state: string): Promise<RegisterRefDataResp> {
    const response = await this.services.getRegister(state);
    const adapterResponse = this.getArrayData(response);
    return { status: 'ok', payload: adapterResponse };
  }

  async deleteRegister(id: string): Promise<RegisterRefDataResp> {
    const response = await this.services.deleteRegister(id);
    const adapterResponse = postResponseAdapter(response);
    return { status: 'ok', payload: adapterResponse };
  }

  async updateStateRegister(
    id: string,
    state: string,
  ): Promise<RegisterRefDataResp> {
    const response = await this.services.updateStateRegister(id, state);
    if (state === 'approved' && response.stateRegistry !== 'approved') {
      await this.firebaseService.addToFirebase(
        response.email,
        response.password,
      );
    }
    const topic = response.email.replace(/@/g, '-');
    await this.notification.sendNotification(
      'Solicitud de registro',
      'Ya puedes acceder a la app de easyReff',
      topic,
    );
    const adapterResponse = postResponseAdapter(response);
    return { status: 'ok', payload: adapterResponse };
  }

  async existsRegister({ dni, email }): Promise<any> {
    if (dni) {
      const dniClear = dni.replace(/[.-]/g, '');
      const response = await this.services.findRegister({ dni: dniClear });
      if (response) {
        const existRegister = true;
        response.existRegister = existRegister;
        const adapterResponse = postResponseAdapter(response);
        return { status: 'ok', payload: adapterResponse };
      }
      return { status: 'ok', payload: { existRegister: false } };
    }
    if (email) {
      const response = await this.services.findRegister({ email: email });
      if (response) {
        const existRegister = true;
        response.existRegister = existRegister;
        const adapterResponse = postResponseAdapter(response);
        return { status: 'ok', payload: adapterResponse };
      }
      return { status: 'ok', payload: { existRegister: false } };
    }
  }

  async getRefs(email: string): Promise<RegisterRefDataResp> {
    const response = await this.services.findRegister({ email: email });
    const adapterResponse = postResponseAdapter(response);
    return { status: 'ok', payload: adapterResponse };
  }

  async changePassword(email: string): Promise<any> {
    const resultToken = await this.firebaseApp
      .auth()
      .generatePasswordResetLink(email);
    const template = Templates.RESET_PASSWORD;
    const subject = 'Cambia tu contraseña';
    await this.mailerService.sendVerificationEmail(
      email,
      resultToken,
      template,
      subject,
    );
    return { status: 'ok', payload: {} };
  }

  getArrayData(response: [any]) {
    const arrayData = [];
    response.forEach((element) => {
      const adapterResponse = postResponseAdapter(element);
      arrayData.push(adapterResponse);
    });
    return arrayData;
  }
}
