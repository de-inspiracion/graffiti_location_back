import { IsOptional, IsString } from 'class-validator';
import { addEventI } from '../../domain/interfaces/calendarDataReq.interface';

export class eventToRef {
  @IsString()
  ref: string;

  @IsString()
  state: string;

  @IsString()
  event: string;
}
export class CalendarAdminEventsDTO implements addEventI {
  @IsString()
  name: string;

  @IsString()
  date: string;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  @IsOptional()
  active: boolean;

  @IsString()
  stadium: string;

  @IsString()
  field: string;

  @IsString()
  @IsOptional()
  user: string;
}

export class CalendarAdminGetEventsDTO {
  @IsString()
  @IsOptional()
  stadium: string;

  @IsString()
  @IsOptional()
  day: string;

  @IsString()
  month: string;

  @IsString()
  year: string;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  type: string;
}
