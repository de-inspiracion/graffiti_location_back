import { ConfigValuesEntity } from '../models/entities/config_valores.entity';
import { Repository } from 'typeorm/repository/Repository';


export class ConfigValuesRepository {

    constructor(
        private readonly configValuesRepo: Repository<ConfigValuesEntity>,
    ) { }

    async getConfigValues(): Promise<ConfigValuesEntity> {
        const config = await this.configValuesRepo.findOne({ where: { id: null } });
        if (!config) return Promise.reject('No se encontraron valores por defecto');
        return config;
    }
} 