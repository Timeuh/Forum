import getConnection from '~/server/sql';
import mysql, {RowDataPacket} from 'mysql2/promise';
import {HTTP_NOT_FOUND, HTTP_SERVER_ERROR} from '~/common/constants/api';
import {ApiError, ApiResponse} from '~/common/types/api';
import {User} from '~/common/types/app';

function isRowDataPacket(row: any): row is RowDataPacket[] {
  return Array.isArray(row) && row.length > 0 && typeof row[0] === 'object';
}

export default defineEventHandler(async (event): Promise<ApiError | ApiResponse<User>> => {
  try {
    const db: mysql.Connection = await getConnection();
    const body = await readBody(event);

    const [assumedUser] = await db.execute('SELECT * FROM user WHERE pseudo = ?', [body.pseudo]);

    if (!isRowDataPacket(assumedUser)) {
      setResponseStatus(event, HTTP_NOT_FOUND);
      return {
        code: HTTP_NOT_FOUND,
        error: 'Utilisateur introuvable',
      } as ApiError;
    }

    return {
      code: 200,
      data: assumedUser[0] as User,
    } as ApiResponse<User>;
  } catch (error: any) {
    setResponseStatus(event, HTTP_SERVER_ERROR);
    return {
      code: HTTP_SERVER_ERROR,
      error: error.message,
    } as ApiError;
  }
});
