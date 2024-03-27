import {FieldPacket, QueryResult} from 'mysql2';
import mysql from 'mysql2/promise';

/**
 * Crée les tables de la base de données.
 *
 * @param db la connexion à la base de données
 */
const createTables = (db: mysql.Connection): Promise<[QueryResult, FieldPacket[]]> => {
  return db.execute(
    `
        CREATE TABLE forum
        (
            id         INT PRIMARY KEY AUTO_INCREMENT,
            name       VARCHAR(255) NOT NULL,
            created_at DATE         NOT NULL
        );

        CREATE TABLE role
        (
            id   INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL
        );

        CREATE TABLE subject
        (
            id                  INT PRIMARY KEY AUTO_INCREMENT,
            name                VARCHAR(255) NOT NULL,
            forum_id            INT,
            created_at          DATE         NOT NULL,
            original_message_id INT,
            FOREIGN KEY (forum_id) REFERENCES forum (id),
            FOREIGN KEY (original_message_id) REFERENCES message (id)
        );

        CREATE TABLE user
        (
            id       INT PRIMARY KEY AUTO_INCREMENT,
            pseudo   VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            role_id  INT,
            FOREIGN KEY (role_id) REFERENCES role (id)
        );

        CREATE TABLE message
        (
            id           INT PRIMARY KEY AUTO_INCREMENT,
            text         VARCHAR(255) NOT NULL,
            user_id      INT,
            subject_id   INT,
            last_updated DATE,
            FOREIGN KEY (user_id) REFERENCES user (id),
            FOREIGN KEY (subject_id) REFERENCES subject (id)
        );

        INSERT INTO role (name) VALUES ('admin');
        INSERT INTO role (name) VALUES ('user');
    `,
  );
};

export default createTables;
