import { IsString } from 'class-validator';
export class eventNotificationDTO {
  @IsString()
  topic: string;

  @IsString()
  title: string;

  @IsString()
  body: string;
}
