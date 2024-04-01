import getConnection from '~/server/sql';
import mysql from 'mysql2/promise';
import {HTTP_BAD_REQUEST, HTTP_CREATED, HTTP_SERVER_ERROR} from '~/common/constants/api';
import {ApiError, ApiResponse} from '~/common/types/api';
import validator from 'validator';
import isRowDataPacket from '~/server/functions/isRowDataPacket';
import encryptPassword from '~/server/bcrypt/encrypt_password';

export default defineEventHandler(async (event): Promise<ApiError | ApiResponse> => {
  try {
    const db: mysql.Connection = await getConnection();
    const {pseudo, password, repeatedPassword, isAdmin} = await readBody(event);

    const parsedPseudo = validator.escape(pseudo);

    const [existingUser] = await db.execute('SELECT id FROM user WHERE pseudo = ?', [parsedPseudo]);
    if (isRowDataPacket(existingUser)) {
      setResponseStatus(event, HTTP_BAD_REQUEST);
      return {
        code: HTTP_BAD_REQUEST,
        error: 'Utilisateur déjà existant',
      } as ApiError;
    }

    if (!validator.equals(password, repeatedPassword)) {
      setResponseStatus(event, HTTP_BAD_REQUEST);
      return {
        code: HTTP_BAD_REQUEST,
        error: 'Les mots de passe ne correspondent pas',
      } as ApiError;
    }

    const encodedPassword = await encryptPassword(password);
    await db.execute('INSERT INTO user (pseudo, password, role_id) VALUES (?, ?, ?)', [
      parsedPseudo,
      encodedPassword,
      isAdmin ? 1 : 2,
    ]);

    setResponseStatus(event, HTTP_CREATED);
    return {
      code: HTTP_CREATED,
      message: 'Compte créé',
    } as ApiResponse;
  } catch (error: any) {
    setResponseStatus(event, HTTP_SERVER_ERROR);
    return {
      code: HTTP_SERVER_ERROR,
      error: error.message,
    } as ApiError;
  }
});
