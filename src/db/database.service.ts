import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class MyService {
  constructor(private readonly connection: Connection) {}

  async execProcedure(someParam: number) {
    const result = await this.connection.query(
      'EXEC procedures.MyProcedure @0',
      [someParam],
    );
  }
}
