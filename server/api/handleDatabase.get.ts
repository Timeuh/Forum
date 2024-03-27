import getConnection from '~/server/sql';
import checkDatabaseExistence from '~/server/sql/check_database_existence';
import {ERROR_NO_SUCH_TABLE} from '~/common/constants/api';
import createTables from '~/server/sql/create_tables';
import createBaseAdmin from '~/server/sql/create_base_admin';

export default defineEventHandler(async (event) => {
  const db = await getConnection();

  try {
    const [rows, fields] = await checkDatabaseExistence(db);

    return {
      data: rows,
    };
  } catch (error: any) {
    if (error.errno !== ERROR_NO_SUCH_TABLE) {
      return {
        error: error.message,
      };
    }

    try {
      await createTables(db);
      const [adminRow, adminFields] = await createBaseAdmin(db);

      return {
        data: {
          adminRow,
        },
      };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }
});
