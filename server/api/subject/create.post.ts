import getConnection from '~/server/sql';
import mysql from 'mysql2/promise';
import {HTTP_CREATED, HTTP_SERVER_ERROR} from '~/common/constants/api';
import {ApiError, ApiResponse} from '~/common/types/api';
import validator from 'validator';

export default defineEventHandler(async (event): Promise<ApiError | ApiResponse> => {
  try {
    const db: mysql.Connection = await getConnection();
    const {name, content, forumId, userId} = await readBody(event);

    const parsedName = validator.escape(name);
    const parsedContent = validator.escape(content);

    const result = await db.query('INSERT INTO subject (name, forum_id, created_at) VALUES (?, ?, NOW())', [
      parsedName,
      Number(forumId),
    ]);

    await db.query('INSERT INTO message (text, user_id, subject_id, last_updated) VALUES (?, ?, ?, NOW())', [
      parsedContent,
      userId,
      result[0].insertId,
    ]);

    setResponseStatus(event, HTTP_CREATED);
    return {
      code: HTTP_CREATED,
      message: 'Sujet créé',
    } as ApiResponse;
  } catch (error: any) {
    setResponseStatus(event, HTTP_SERVER_ERROR);
    return {
      code: HTTP_SERVER_ERROR,
      error: error.message,
    } as ApiError;
  }
});
