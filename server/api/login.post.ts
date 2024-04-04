import getConnection from '~/server/sql';
import mysql from 'mysql2/promise';
import {HTTP_BAD_REQUEST, HTTP_NOT_FOUND, HTTP_SERVER_ERROR} from '~/common/constants/api';
import {ApiError, ApiResponse} from '~/common/types/api';
import {User} from '~/common/types/app';
import validatePassword from '~/server/bcrypt/validate_password';
import validator from 'validator';
import isRowDataPacket from '~/server/functions/isRowDataPacket';

export default defineEventHandler(async (event): Promise<ApiError | ApiResponse<User>> => {
  try {
    const db: mysql.Connection = await getConnection();
    const body = await readBody(event);

    const parsedPseudo = validator.escape(body.pseudo);

    const [assumedUser] = await db.execute(
      'SELECT * FROM user inner join role on user.role_id = role.id WHERE pseudo = ?',
      [parsedPseudo],
    );

    if (!isRowDataPacket(assumedUser)) {
      setResponseStatus(event, HTTP_NOT_FOUND);
      return {
        code: HTTP_NOT_FOUND,
        error: 'Utilisateur introuvable',
      } as ApiError;
    }

    const isPasswordValid = await validatePassword(body.password, assumedUser[0].password);
    if (!isPasswordValid) {
      setResponseStatus(event, HTTP_BAD_REQUEST);
      return {
        code: HTTP_BAD_REQUEST,
        error: 'Mot de passe incorrect',
      } as ApiError;
    }

    return {
      code: 200,
      data: {
        pseudo: assumedUser[0].pseudo,
        role: assumedUser[0].name,
        id: assumedUser[0].id,
      } as User,
    } as ApiResponse<User>;
  } catch (error: any) {
    setResponseStatus(event, HTTP_SERVER_ERROR);
    return {
      code: HTTP_SERVER_ERROR,
      error: error.message,
    } as ApiError;
  }
});
