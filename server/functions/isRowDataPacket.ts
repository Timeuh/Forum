import {RowDataPacket} from 'mysql2/promise';

function isRowDataPacket(row: any): row is RowDataPacket[] {
  return Array.isArray(row) && row.length > 0 && typeof row[0] === 'object';
}

export default isRowDataPacket;
