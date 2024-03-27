import getConnection from '~/server/sql';

export default defineEventHandler(async (event) => {
  const db = await getConnection();

  const [rows, fields] = await db.execute('SELECT * FROM movies');
  return {
    movies: rows,
  };
});
