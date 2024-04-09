import getConnection from '~/server/sql';
import mysql from 'mysql2/promise';
import {HTTP_CREATED, HTTP_SERVER_ERROR} from '~/common/constants/api';
import {ApiError, ApiResponse} from '~/common/types/api';
import validator from 'validator';

export default defineEventHandler(async (event): Promise<ApiError | ApiResponse> => {
  try {
    const db: mysql.Connection = await getConnection();
    const {content, subjectId, userId} = await readBody(event);

    const parsedContent = validator.escape(content);

    await db.query('INSERT INTO message (text, user_id, subject_id, last_updated) VALUES (?, ?, ?, NOW())', [
      parsedContent,
      Number(userId),
      Number(subjectId),
    ]);

    setResponseStatus(event, HTTP_CREATED);
    return {
      code: HTTP_CREATED,
      message: 'Message créé',
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
