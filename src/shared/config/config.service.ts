
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Config } from './schema/config.schema';
import { Model } from 'mongoose';

@Injectable()
export class ConfigurationService {
    private logger: Logger = new Logger(ConfigurationService.name);

    constructor(
        //@Inject(ConfigurationDocument.collectionName)
        //private configurationCollection: CollectionReference<ConfigurationDocument>,
        @InjectModel(Config.name) private configModel: Model<Config>,
    ) { }

    async getConfiguration(): Promise<Config> {
        try {
            const configs = await this.configModel.find().exec();
            return configs[0];
        } catch (error) {
            this.logger.error(`Error al obtener configuración: ${error}`);
            return null;
        }
    }

    // async getConfiguration(): Promise<ConfigurationDocument> {
    //     try {
    //         const snapshot = await this.configurationCollection.get();
    //         const data = snapshot.docs.map(doc => doc.data());
    //         const config: ConfigurationDocument = data[0];
    //         return config;
    //     } catch (error) {
    //         this.logger.error(`Error al obtener configuracion: ${error}`);
    //         return null;
    //     }
    // }
}