import { Inject, Injectable, Logger } from '@nestjs/common';
import { CollectionReference } from '@google-cloud/firestore';
import { ConfigurationLoggerTrx } from './logger.format';
import { Timestamp } from '@google-cloud/firestore';
import { DateDto } from 'src/modules/logs-endpoint/dto/date.dto';
@Injectable()
export class LoggerClientServicesTrx {
  private logger: Logger = new Logger(LoggerClientServicesTrx.name);

  constructor(
    @Inject(ConfigurationLoggerTrx.collectionName)
    private loggerConfig: CollectionReference<ConfigurationLoggerTrx>,
  ) { }

  async log(dataLogger: ConfigurationLoggerTrx) {
    try {
      const currentDate = Timestamp.fromDate(new Date());
      dataLogger.createdAt = currentDate;
      const insertLogger = await this.loggerConfig.add(dataLogger);
      return insertLogger;
    } catch (error) {
      this.logger.error(`Error al obtener configuracion: ${error}`);
      return null;
    }
  }

  async getAllLogs() {
    try {
      const logs = await this.loggerConfig.orderBy('createdAt', 'desc').get();
      const formatDateLogs = logs.docs.map((log) => {
        const data = log.data();
        data.createdAt = data.createdAt instanceof Date ? data.createdAt : data.createdAt.toDate();
        return data;
      });
      return formatDateLogs;
    } catch (error) {
      this.logger.error(`Error al obtener logs: ${error}`);
      return null;
    }
  }

  async getLogsByDate(dateDto: DateDto) {
    const startDate = new Date(dateDto.date);
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(dateDto.date);
    endDate.setUTCHours(23, 59, 59, 999);
    const startTimestamp = Timestamp.fromDate(startDate);
    const endTimestamp = Timestamp.fromDate(endDate);
    try {
      const logs = await this.loggerConfig
        .where('createdAt', '>=', startTimestamp)
        .where('createdAt', '<=', endTimestamp)
        .get();
      const formatDateLogs = logs.docs.map((log) => {
        const data = log.data();
        data.createdAt = data.createdAt instanceof Date ? data.createdAt : data.createdAt.toDate();
        return data;
      });
      return formatDateLogs;
    } catch (error) {
      this.logger.error(`Error al obtener logs: ${error}`);
      return null;
    }
  }

  async deleteAllLogs() {
    try {
      const logs = await this.loggerConfig.get();
      const deleteLogs = logs.docs.map((log) => {
        return log.ref.delete();
      });
      await Promise.all(deleteLogs);
      return { message: 'Logs eliminados' };
    } catch (error) {
      this.logger.error(`Error al eliminar logs: ${error}`);
      return null;
    }
  }
}
