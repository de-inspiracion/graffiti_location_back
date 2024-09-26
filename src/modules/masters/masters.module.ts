import { Module } from '@nestjs/common';
import { LoggerClientServicesTrx } from '../../shared/logger/logger.client';
import { MongoService } from './infra/mongoServices';
import { MongooseModule } from '@nestjs/mongoose';
import { mastersController } from './infra/masters.controller';
import { MastersService } from './application/masters.service';
import { Gender, GenderSchema } from './infra/schemas/gender.schema';
import { Country, CountrySchema } from './infra/schemas/country.schema';
import { City, CitySchema } from './infra/schemas/cities.schema';
import { Profile, ProfileSchema } from './infra/schemas/profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Gender.name, schema: GenderSchema },
      { name: Country.name, schema: CountrySchema },
      { name: City.name, schema: CitySchema },
      { name: Profile.name, schema: ProfileSchema },
    ]),
  ],
  controllers: [mastersController],
  providers: [
    MastersService,
    LoggerClientServicesTrx,
    { provide: 'mastersServices', useClass: MongoService },
  ],
  exports: [],
})
export class MastersModule {}
