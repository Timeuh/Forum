import getConnection from '~/server/sql';
import checkDatabaseExistence from '~/server/sql/check_database_existence';
import {ERROR_NO_SUCH_TABLE, HTTP_CREATED, HTTP_OK, HTTP_SERVER_ERROR} from '~/common/constants/api';
import createTables from '~/server/sql/create_tables';
import createBaseAdmin from '~/server/sql/create_base_admin';
import {ApiError, ApiResponse} from '~/common/types/api';
import {QueryResult} from 'mysql2';

export default defineEventHandler(async (event) => {
  const db = await getConnection();

  try {
    const [rows, fields] = await checkDatabaseExistence(db);

    return {
      code: HTTP_OK,
      data: rows,
    } as ApiResponse<QueryResult>;
  } catch (error: any) {
    if (error.errno !== ERROR_NO_SUCH_TABLE) {
      return {
        error: error.message,
      };
    }

    try {
      await createTables(db);
      await createBaseAdmin(db);

      return {
        code: HTTP_CREATED,
        message: 'Base de donnée créée, avec un admin par défaut.',
      } as ApiResponse;
    } catch (error: any) {
      return {
        code: HTTP_SERVER_ERROR,
        message: error.message,
      } as ApiError;
    }
  }
});
