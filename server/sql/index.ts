import mysql from 'mysql2/promise';
import bluebird from 'bluebird';

/**
 * Crée une connexion à la base de données
 *
 * @returns La connexion à la base de données dans une promesse
 */
const getConnection = (): Promise<mysql.Connection> => {
  return mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    Promise: bluebird,
  });
};

export default getConnection;
