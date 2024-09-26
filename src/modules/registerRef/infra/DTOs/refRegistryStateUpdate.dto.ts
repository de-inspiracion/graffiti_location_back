import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RegisterRefData } from '../../domain/interfaces/registerRefData.interface';

export class RegistryRefStateUpdateDTO {
  @IsString()
  id: string;

  @IsString()
  state: string;
}
