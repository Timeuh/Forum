import {FieldPacket, QueryResult} from 'mysql2';
import encryptPassword from '~/server/bcrypt/encrypt_password';
import mysql from 'mysql2/promise';

/**
 * Crée un utilisateur admin de base.
 *
 * @param db la connexion à la base de données
 */
const createBaseAdmin = async (db: mysql.Connection): Promise<[QueryResult, FieldPacket[]]> => {
  if (!process.env.ADMIN_USERNAME) {
    throw new Error('Erreur : vous devez renseigner la variable d’environnement ADMIN_USERNAME dans le .env');
  }

  if (!process.env.ADMIN_PASSWORD) {
    throw new Error('Erreur : vous devez renseigner la variable d’environnement ADMIN_PASSWORD dans le .env');
  }

  const hashedPassword = await encryptPassword(process.env.ADMIN_PASSWORD);

  return db.execute(
    `
        INSERT INTO user (pseudo, password, role_id)
        VALUES (?, ?, 1)
    `,
    [process.env.ADMIN_USERNAME, hashedPassword],
  );
};

export default createBaseAdmin;
