import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Log } from './schemas/log.schema';
import { Model } from 'mongoose';
import { LogDto } from './dto/log.dto';
import { DateDto } from './dto/date.dto';
import dayjs from 'dayjs';

@Injectable()
export class LogEndpointService {

    constructor(@InjectModel(Log.name) private logModel: Model<Log>) { }

    async findAll(): Promise<Log[]> {
        return this.logModel.find().sort({ createdAt: -1 }).exec();
    }

    async create(log: LogDto): Promise<Log> {
        const newLog = new this.logModel(log);
        return newLog.save();
    }

    async findByDate(dateDto: DateDto): Promise<Log[]> {
        const startOfDay = dayjs(dateDto.date).startOf('day').toDate();
        const endOfDay = dayjs(dateDto.date).endOf('day').toDate();
        return this.logModel.find({ createdAt: { $gte: startOfDay, $lte: endOfDay } }).sort({ createdAt: -1 }).exec();
    }

    async deleteAll(): Promise<{ deletedCount?: number }> {
        return this.logModel.deleteMany({}).exec();
    }
}