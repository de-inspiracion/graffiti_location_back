import { Timestamp } from '@google-cloud/firestore';

export enum TypeLogger {
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export class ConfigurationLoggerTrx {
  static collectionName = 'logs';

  type: TypeLogger;
  message?: string;
  query?: string;
  module?: string;
  service?: string;
  createdAt?: Timestamp | Date;
}
