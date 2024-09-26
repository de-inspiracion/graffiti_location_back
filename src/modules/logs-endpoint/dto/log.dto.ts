import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { TypeLogger } from '../../../shared/logger/logger.format';

export class LogDto {

    @ApiProperty({
        title: 'type',
        description: 'Tipo de log',
        enum: TypeLogger,
        type: String,
        required: true
    })
    @IsEnum(TypeLogger)
    type: TypeLogger;

    @ApiProperty({
        title: 'message',
        description: 'Mensaje de error',
        example: 'Esto es un error',
        type: String,
        required: false
    })
    @IsString()
    message?: string;

    @ApiProperty({
        title: 'module',
        description: 'Módulo donde está el error',
        example: 'M1 - Módulo 1',
        type: String,
    })
    @IsString()
    module: string;

    @ApiProperty({
        title: 'service',
        description: 'Servicio donde está el error',
        example: 'Service 1',
        type: String,
        required: true
    })
    @IsString()
    service: string;

    @ApiProperty({
        title: 'query',
        description: 'Query ejecutada',
        example: 'SELECT * FROM table',
        type: String,
    })
    @IsString()
    query: string;
}
