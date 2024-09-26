import { InjectModel } from '@nestjs/mongoose';
import { DataBaseI } from '../../domain/interfaces/database.interface';
import { RegisterRef } from './registerRef.schema';
import { Model } from 'mongoose';
import { RegisterRefData } from '../../domain/interfaces/registerRefData.interface';
import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { StatesEnum } from '../enums/states.enum';
import { ExistRegisterDTO } from '../DTOs/refExistRegister.dto';

export class MongoService implements DataBaseI {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    @InjectModel(RegisterRef.name)
    private registerRef: Model<RegisterRef>,
  ) {}
  async addRegister(data: RegisterRefData) {
    const existDni = await this.registerRef.findOne({ dni: data.dni });
    if (existDni) {
      throw new HttpException(
        { message: { es: 'DNI ya existe', en: 'DNI already exists' } },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.registerRef.create(data);
  }

  getRegistersQuery(query: any) {
    return this.registerRef.find(query);
  }

  findAndDeleteRegister(id: any) {
    return this.registerRef.findByIdAndDelete({ _id: id });
  }

  getRegister(state: string) {
    if (state.toUpperCase() === 'ALL') {
      return this.registerRef.find({
        emailVerified: true,
        profile: 'REF',
      });
    }
    return this.registerRef.find({
      stateRegistry: state.toUpperCase(),
      emailVerified: true,
      profile: 'REF',
    });
  }

  deleteRegister(id: string): any {
    return this.registerRef.deleteOne({ _id: id });
  }

  updateStateRegister(id: string, state: string) {
    return this.registerRef.findByIdAndUpdate(id, {
      stateRegistry: StatesEnum[state.toLowerCase()] || 'PENDING',
    });
  }

  findRegister({ dni, email }) {
    if (dni) {
      const dniClear = dni.replace(/[.-]/g, '');
      return this.registerRef.findOne({ dni: dniClear });
    }
    if (email) {
      const emailTransform = email.toLowerCase();
      return this.registerRef.findOne({ email: emailTransform });
    }

    throw new HttpException(
      {
        message: {
          es: 'no se especifico el dni o el email',
          en: 'no dni or email',
        },
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  verifyEmailRegistry(token: string) {
    return this.registerRef.findOne({ emailVerifytoken: token });
  }

  updateRegisterVerifyEmail(id) {
    return this.registerRef.findByIdAndUpdate(id, {
      emailVerified: true,
    });
  }

  getTest() {
    return { status: 'ok' };
  }
}
