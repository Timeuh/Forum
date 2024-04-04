import getConnection from '~/server/sql';
import mysql from 'mysql2/promise';
import {HTTP_NOT_FOUND, HTTP_OK, HTTP_SERVER_ERROR} from '~/common/constants/api';
import {ApiError, ApiResponse} from '~/common/types/api';
import isRowDataPacket from '~/server/functions/isRowDataPacket';

export default defineEventHandler(async (event): Promise<ApiError | ApiResponse> => {
  try {
    const db: mysql.Connection = await getConnection();
    const {id} = await readBody(event);

    const [subject] = await db.query('SELECT * from subject where id = ?', [Number(id)]);

    if (!isRowDataPacket(subject)) {
      setResponseStatus(event, HTTP_NOT_FOUND);
      return {
        code: HTTP_NOT_FOUND,
        error: 'Erreur, ce sujet n’existe pas',
      } as ApiError;
    }

    const [messages] = await db.query(
      `
        SELECT
            message.*,
            user.pseudo
        FROM message
                 INNER JOIN user ON message.user_id = user.id
        WHERE message.subject_id = ?;
    `,
      [Number(id)],
    );

    setResponseStatus(event, HTTP_OK);
    return {
      code: HTTP_OK,
      data: {
        subject: subject[0],
        messages: messages,
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
