import getConnection from '~/server/sql';
import mysql from 'mysql2/promise';
import {HTTP_BAD_REQUEST, HTTP_CREATED, HTTP_SERVER_ERROR} from '~/common/constants/api';
import {ApiError, ApiResponse} from '~/common/types/api';
import validator from 'validator';
import isRowDataPacket from '~/server/functions/isRowDataPacket';

export default defineEventHandler(async (event): Promise<ApiError | ApiResponse> => {
  try {
    const db: mysql.Connection = await getConnection();
    const {name} = await readBody(event);

    const parsedName = validator.escape(name);

    const [existenceCheck] = await db.query('SELECT id FROM forum WHERE name = ?', [parsedName]);

    if (isRowDataPacket(existenceCheck)) {
      setResponseStatus(event, HTTP_BAD_REQUEST);
      return {
        code: HTTP_BAD_REQUEST,
        error: 'Ce forum existe déjà',
      } as ApiError;
    }

    await db.query('INSERT INTO forum (name, created_at) VALUES (?, NOW())', [parsedName]);

    setResponseStatus(event, HTTP_CREATED);
    return {
      code: HTTP_CREATED,
      message: 'Forum créé',
    } as ApiResponse;
  } catch (error: any) {
    setResponseStatus(event, HTTP_SERVER_ERROR);
    return {
      code: HTTP_SERVER_ERROR,
      error: error.message,
    } as ApiError;
  }
});
