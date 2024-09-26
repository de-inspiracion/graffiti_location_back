import { InjectModel } from '@nestjs/mongoose';
import { MastersDataBaseI } from '../domain/database.interface';
import { Model } from 'mongoose';
import { Gender } from './schemas/gender.schema';
import { Country } from './schemas/country.schema';
import { City } from './schemas/cities.schema';
import { Profile } from './schemas/profile.schema';
import { typeDocument } from './schemas/typeDocument.schema';

export class MongoService implements MastersDataBaseI {
  constructor(
    @InjectModel(Gender.name)
    private gender: Model<Gender>,
    @InjectModel(Country.name)
    private contries: Model<Country>,
    @InjectModel(City.name)
    private cities: Model<City>,
    @InjectModel(Profile.name)
    private profiles: Model<Profile>,
  ) {}

  getCountries() {
    return this.contries.find();
  }
  getCities(id: string) {
    return this.cities.findOne({ country: id });
  }
  getGender() {
    return this.gender.find();
  }

  getProfiles() {
    return this.profiles.find();
  }
}
