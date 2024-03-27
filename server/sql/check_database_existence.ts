import {Connection, Query} from 'mysql2';

/**
 * Vérifie que la base de données existe.
 *
 * @param db la connexion à la base de données
 */
const checkDatabaseExistence = (db: Connection): Query => {
  return db.execute(
    `
        SELECT id FROM user WHERE id = 1;
    `,
  );
};

export default checkDatabaseExistence;
