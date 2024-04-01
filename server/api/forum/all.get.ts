import {ApiError, ApiResponse} from '~/common/types/api';
import {Forum} from '~/common/types/app';
import mysql from 'mysql2/promise';
import getConnection from '~/server/sql';
import {HTTP_BAD_REQUEST, HTTP_OK, HTTP_SERVER_ERROR} from '~/common/constants/api';
import isRowDataPacket from '~/server/functions/isRowDataPacket';

export default defineEventHandler(async (event): Promise<ApiError | ApiResponse<Forum[]>> => {
  try {
    const db: mysql.Connection = await getConnection();
    const [forums] = await db.query(`
      SELECT f.id, f.name, f.created_at, COUNT(s.id) AS subject_count
      FROM forum f
      LEFT JOIN subject s ON s.forum_id = f.id
      GROUP BY f.id, f.name, f.created_at
      ORDER BY f.id DESC;
    `);

    if (!isRowDataPacket(forums)) {
      setResponseStatus(event, HTTP_BAD_REQUEST);
      return {
        code: HTTP_BAD_REQUEST,
        error: 'Aucun forum trouvé',
      } as ApiError;
    }

    setResponseStatus(event, HTTP_OK);
    return {
      code: HTTP_OK,
      data: forums as Forum[],
    } as ApiResponse<Forum[]>;
  } catch (error: any) {
    setResponseStatus(event, HTTP_SERVER_ERROR);
    return {
      code: HTTP_SERVER_ERROR,
      error: error.message,
    } as ApiError;
  }
});
