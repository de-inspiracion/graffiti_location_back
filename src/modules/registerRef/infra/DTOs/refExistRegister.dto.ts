import { IsEmail, IsOptional, IsString } from 'class-validator';

export class ExistRegisterDTO {
  @IsString()
  @IsOptional()
  dni: string;

  @IsString()
  @IsOptional()
  email: string;
}
