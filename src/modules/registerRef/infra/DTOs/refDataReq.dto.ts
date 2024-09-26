import { IsEmail, IsString } from 'class-validator';

export class refDataReqDTO {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  dni: string;
}
