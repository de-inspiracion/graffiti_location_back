import { IsOptional, IsString } from 'class-validator';
import { addEventI } from '../../domain/interfaces/calendarDataReq.interface';
import { StatesEvent } from 'src/shared/enums/states';

export class CalendarAdminEventsDTO implements addEventI {
  @IsString()
  @IsOptional()
  state: StatesEvent;

  @IsString()
  date: string;

  @IsString()
  @IsOptional()
  user: string;

  @IsString()
  event: string;
}

export class CalendarAdminGetEventsDTO {
  @IsString()
  @IsOptional()
  user: string;

  @IsString()
  @IsOptional()
  day: string;

  @IsString()
  month: string;

  @IsString()
  year: string;
}

export class myEventsDTO {
  @IsString()
  @IsOptional()
  user: string;

  @IsString()
  state: string;
}
