import getConnection from '~/server/sql';
import mysql from 'mysql2/promise';
import {HTTP_CREATED, HTTP_SERVER_ERROR} from '~/common/constants/api';
import {ApiError, ApiResponse} from '~/common/types/api';

export default defineEventHandler(async (event): Promise<ApiError | ApiResponse> => {
  try {
    const db: mysql.Connection = await getConnection();
    const {name} = await readBody(event);

    await db.query('INSERT INTO forum (name, created_at) VALUES (?, NOW())', [name]);

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
