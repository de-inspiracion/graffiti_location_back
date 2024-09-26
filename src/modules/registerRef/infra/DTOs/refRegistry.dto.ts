import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { RegisterRefData } from '../../domain/interfaces/registerRefData.interface';

class sportsImplementation {
  @IsString()
  name: string;

  @IsBoolean()
  has: boolean;
}
export class RegistryRefDTO implements RegisterRefData {
  photoDocumentBack?: string;
  stateRegistry?: string;
  existRegister?: boolean;
  emailVerified: boolean;
  topics?: {
    country: string;
    city: string;
    emailFormat: string;
    profile: string;
  };
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  photoSelfie: string;

  @IsString()
  photoDocumentFront: string;

  @IsOptional()
  @IsString()
  photoDocumentBrack: string;

  @IsNumber()
  yearsExperience: number;

  @IsArray()
  sportsImplementation: sportsImplementation[];

  @IsString()
  dni: string;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  stateAddress: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsString()
  gender: string;

  @IsString()
  address: string;

  @IsString()
  birthdate: string;

  @IsString()
  @IsOptional()
  profile: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  postalCode: string;

  @IsBoolean()
  @IsOptional()
  hasExperience: boolean;

  @IsString()
  @IsOptional()
  token: string;
}
