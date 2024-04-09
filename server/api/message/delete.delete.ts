import getConnection from '~/server/sql';
import mysql from 'mysql2/promise';
import {HTTP_CREATED, HTTP_SERVER_ERROR} from '~/common/constants/api';
import {ApiError, ApiResponse} from '~/common/types/api';

export default defineEventHandler(async (event): Promise<ApiError | ApiResponse> => {
  try {
    const db: mysql.Connection = await getConnection();
    const {messageId} = await readBody(event);

    await db.query('delete from message where id = ?', [Number(messageId)]);

    setResponseStatus(event, HTTP_CREATED);
    return {
      code: HTTP_CREATED,
      message: 'Message supprimé',
    } as ApiResponse;
  } catch (error: any) {
    setResponseStatus(event, HTTP_SERVER_ERROR);
    console.log(error);
    return {
      code: HTTP_SERVER_ERROR,
      error: error.message,
    } as ApiError;
  }
});
