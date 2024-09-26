import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    title: 'username',
    description: 'Usuario de la aplicación',
    maxLength: 30,
    minLength: 5,
    required: true,
    example: 'admin',
    type: String,
  })
  @IsString()
  @MaxLength(30)
  username: string;

  @ApiProperty({
    title: 'password',
    description: 'Contraseña de la aplicación',
    maxLength: 30,
    minLength: 5,
    required: true,
    example: 'admin',
    type: String,
  })
  password: string;
}
