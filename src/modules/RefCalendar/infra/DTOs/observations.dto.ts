import { IsOptional, IsString } from 'class-validator';

export class ObservationDTO {
  @IsString()
  @IsOptional()
  arriveTime: string;

  @IsString()
  @IsOptional()
  leaveTime: string;

  @IsString()
  @IsOptional()
  observations: string;
}
