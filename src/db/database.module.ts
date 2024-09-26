import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'mssql',
    //     options: { encrypt: false },
    //     host: configService.get('DB_HOST'),
    //     port: Number(configService.get('DB_PORT')),
    //     username: configService.get('DB_USER'),
    //     password: configService.get('DB_PASSWORD'),
    //     database: configService.get('DB_DATABASE'),
    //     entities: [],
    //     logging: true,
    //     synchronize: false,
    //   }),
    // }),
  ],
})
export class DatabaseModule { }
