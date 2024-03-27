import {FieldPacket, QueryResult} from 'mysql2';
import mysql from 'mysql2/promise';

/**
 * Vérifie que la base de données existe.
 *
 * @param db la connexion à la base de données
 */
const checkDatabaseExistence = (db: mysql.Connection): Promise<[QueryResult, FieldPacket[]]> => {
  return db.execute(
    `
        SELECT id FROM user WHERE id = 1;
    `,
  );
};

export default checkDatabaseExistence;
