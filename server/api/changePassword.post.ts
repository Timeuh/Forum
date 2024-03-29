import getConnection from '~/server/sql';
import mysql from 'mysql2/promise';
import {HTTP_BAD_REQUEST, HTTP_OK, HTTP_SERVER_ERROR} from '~/common/constants/api';
import {ApiError, ApiResponse} from '~/common/types/api';
import validator from 'validator';
import validatePassword from '~/server/bcrypt/validate_password';
import encryptPassword from '~/server/bcrypt/encrypt_password';
import isRowDataPacket from '~/server/functions/isRowDataPacket';

export default defineEventHandler(async (event): Promise<ApiError | ApiResponse> => {
  try {
    const db: mysql.Connection = await getConnection();
    const {currentPassword, newPassword, repeatedPassword, pseudo} = await readBody(event);

    if (!validator.equals(newPassword, repeatedPassword)) {
      setResponseStatus(event, HTTP_BAD_REQUEST);
      return {
        code: HTTP_BAD_REQUEST,
        error: 'Les nouveaux mots de passe ne correspondent pas',
      } as ApiError;
    }

    if (!pseudo) {
      setResponseStatus(event, HTTP_BAD_REQUEST);
      return {
        code: HTTP_BAD_REQUEST,
        error: 'Utilisateur inconnu',
      } as ApiError;
    }
    const [assumedUser] = await db.execute('SELECT * FROM user WHERE pseudo = ?', [pseudo]);

    if (!isRowDataPacket(assumedUser)) {
      setResponseStatus(event, HTTP_BAD_REQUEST);
      return {
        code: HTTP_BAD_REQUEST,
        error: 'Utilisateur inconnu',
      } as ApiError;
    }

    const isPasswordValid = await validatePassword(currentPassword, assumedUser[0].password);

    if (!isPasswordValid) {
      setResponseStatus(event, HTTP_BAD_REQUEST);
      return {
        code: HTTP_BAD_REQUEST,
        error: 'Mot de passe actuel incorrect',
      } as ApiError;
    }

    const encodedPassword = await encryptPassword(newPassword);

    await db.execute('UPDATE user SET password = ? WHERE pseudo = ?', [encodedPassword, pseudo]);

    setResponseStatus(event, HTTP_OK);
    return {
      code: HTTP_OK,
      message: 'Mot de passe modifié',
    } as ApiResponse;
  } catch (error: any) {
    setResponseStatus(event, HTTP_SERVER_ERROR);
    return {
      code: HTTP_SERVER_ERROR,
      error: error.message,
    } as ApiError;
  }
});
