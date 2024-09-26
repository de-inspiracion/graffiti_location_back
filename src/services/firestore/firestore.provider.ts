import { ConfigurationLoggerTrx } from '../../shared/logger/logger.format';
import { AuthDocument } from '../../auth/auth.document';
import { ConfigurationDocument } from '../../shared/config/config.document';

export const FirestoreDatabaseProvider = 'firestoredb';
export const FirestoreOptionsProvider = 'firestoreOptions';
export const FirestoreCollectionProviders: string[] = [
  AuthDocument.collectionName,
  ConfigurationDocument.collectionName,
  ConfigurationLoggerTrx.collectionName,
];
