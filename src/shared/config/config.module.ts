import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationService } from './config.service';
import { Config, ConfigSchema } from './schema/config.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Config.name, schema: ConfigSchema }])],
    providers: [ConfigurationService],
    exports: [MongooseModule],
})
export class ConfigurationModule { }
