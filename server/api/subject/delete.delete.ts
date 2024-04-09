import getConnection from '~/server/sql';
import mysql from 'mysql2/promise';
import {HTTP_OK, HTTP_SERVER_ERROR} from '~/common/constants/api';
import {ApiError, ApiResponse} from '~/common/types/api';

export default defineEventHandler(async (event): Promise<ApiError | ApiResponse> => {
  try {
    const db: mysql.Connection = await getConnection();
    const {id} = await readBody(event);

    await db.query('delete from subject where id = ?', [Number(id)]);

    setResponseStatus(event, HTTP_OK);
    return {
      code: HTTP_OK,
      message: 'Sujet supprimé',
    } as ApiResponse;
  } catch (error: any) {
    setResponseStatus(event, HTTP_SERVER_ERROR);
    return {
      code: HTTP_SERVER_ERROR,
      error: error.message,
    } as ApiError;
  }
});
