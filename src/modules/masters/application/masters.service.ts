import { Inject, Injectable, Logger } from '@nestjs/common';
import { MastersDataBaseI } from '../domain/database.interface';
import {
  SoccerFieldInterface,
  StadiumInterface,
} from '../domain/stadium.interfaces';

@Injectable()
export class MastersService {
  private readonly NAME = 'MASTER';
  private logger: Logger = new Logger(MastersService.name);

  constructor(@Inject('mastersServices') private services: MastersDataBaseI) {}

  async getGender() {
    const response = await this.services.getGender();
    const result = this.changeId(response);
    return result;
  }

  async getContries() {
    const response = await this.services.getCountries();
    return response;
  }

  async getProfiles() {
    const response = await this.services.getProfiles();
    const result = this.changeId(response);
    return result;
  }

  changeId(response: [any]) {
    const newResponse = [];
    response.forEach((element) => {
      const newElement = {
        id: element.id,
        name: element.name,
      };
      newResponse.push(newElement);
    });
    return newResponse;
  }
}
