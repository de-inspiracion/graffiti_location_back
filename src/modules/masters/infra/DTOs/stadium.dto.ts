import { IsEmail, IsString } from 'class-validator';

export class StadiumDTO {
  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  stateAddress: string;

  @IsString()
  name: string;
}

export class SoccerFieldDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  stadiumId: string;
}
