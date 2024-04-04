import getConnection from '~/server/sql';
import mysql from 'mysql2/promise';
import {HTTP_OK, HTTP_SERVER_ERROR} from '~/common/constants/api';
import {ApiError, ApiResponse} from '~/common/types/api';
import isRowDataPacket from '~/server/functions/isRowDataPacket';

export default defineEventHandler(async (event): Promise<ApiError | ApiResponse> => {
  try {
    const db: mysql.Connection = await getConnection();
    const {id} = await readBody(event);

    const [forum] = await db.query('SELECT * FROM forum WHERE id = ?;', [id]);
    const [subjects] = await db.query('SELECT * FROM subject WHERE forum_id = ? order by id DESC', [id]);

    if (!isRowDataPacket(forum)) {
      setResponseStatus(event, HTTP_SERVER_ERROR);
      return {
        code: HTTP_SERVER_ERROR,
        error: 'Forum non trouvé',
      } as ApiError;
    }

    setResponseStatus(event, HTTP_OK);
    return {
      code: HTTP_OK,
      data: {
        forum: forum[0],
        subjects: subjects,
      },
    } as ApiResponse;
  } catch (error: any) {
    setResponseStatus(event, HTTP_SERVER_ERROR);
    return {
      code: HTTP_SERVER_ERROR,
      error: error.message,
    } as ApiError;
  }
});
