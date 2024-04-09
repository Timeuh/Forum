import mysql from 'mysql2/promise';

/**
 * Crée les tables de la base de données.
 *
 * @param db la connexion à la base de données
 */
const createTables = async (db: mysql.Connection): Promise<void | any> => {
  await db.execute(`
        CREATE TABLE forum
        (
            id         INT PRIMARY KEY AUTO_INCREMENT,
            name       VARCHAR(255) NOT NULL,
            created_at DATE         NOT NULL
        );
    `);

  await db.execute(`
        CREATE TABLE role
        (
            id   INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL
        );
    `);

  await db.execute(`
        CREATE TABLE user
        (
            id       INT PRIMARY KEY AUTO_INCREMENT,
            pseudo   VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            role_id  INT,
            FOREIGN KEY (role_id) REFERENCES role (id)
        );
    `);

  await db.execute(`
      CREATE TABLE subject
      (
          id                  INT PRIMARY KEY AUTO_INCREMENT,
          name                VARCHAR(255) NOT NULL,
          forum_id            INT,
          created_at          DATE         NOT NULL,
          FOREIGN KEY (forum_id) REFERENCES forum (id) ON DELETE CASCADE
      );
  `);

  await db.execute(`
        CREATE TABLE message
        (
            id           INT PRIMARY KEY AUTO_INCREMENT,
            text         VARCHAR(255) NOT NULL,
            user_id      INT,
            subject_id   INT,
            last_updated DATE,
            FOREIGN KEY (user_id) REFERENCES user (id),
            FOREIGN KEY (subject_id) REFERENCES subject (id) ON DELETE CASCADE
        );
    `);

  await db.execute(`
        INSERT INTO role (name) VALUES ('admin');
    `);

  await db.execute(`
        INSERT INTO role (name) VALUES ('user');
    `);
};

export default createTables;
