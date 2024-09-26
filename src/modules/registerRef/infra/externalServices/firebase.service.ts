import { HttpException, HttpStatus } from '@nestjs/common';
import * as admin from 'firebase-admin';

export class FirebaseService {
  async addToFirebase(email: string, password: string, disable = false) {
    try {
      const add = await admin.auth().createUser({
        email: email,
        password: password,
        disabled: disable,
      });
      return add;
    } catch (error) {
      throw new HttpException(
        {
          message: {
            es: error.message,
            en: error.message,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateToFirebase(email: string, disable: boolean) {
    try {
      const update = await admin.auth().updateUser(email, {
        disabled: disable,
      });
      return update;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
