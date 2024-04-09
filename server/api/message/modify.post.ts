import getConnection from '~/server/sql';
import mysql from 'mysql2/promise';
import {HTTP_OK, HTTP_SERVER_ERROR} from '~/common/constants/api';
import {ApiError, ApiResponse} from '~/common/types/api';
import validator from 'validator';

export default defineEventHandler(async (event): Promise<ApiError | ApiResponse> => {
  try {
    const db: mysql.Connection = await getConnection();
    const {content, messageId} = await readBody(event);

    const parsedContent = validator.escape(content);

    await db.query('UPDATE message set text = ?, last_updated = NOW() where id = ?', [
      parsedContent,
      Number(messageId),
    ]);

    setResponseStatus(event, HTTP_OK);
    return {
      code: HTTP_OK,
      message: 'Message mis à jour',
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
