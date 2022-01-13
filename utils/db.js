import kn from 'knex';

export const connectionInfo = {
  host: '34.101.143.154',
  port: 3306,
  user: 'root',
  password: 'Czsbjt36684c4Mkv',
  database: 'auction',
};

const knex = kn({
  client: 'mysql2',
  connection: connectionInfo,
  pool: { min: 0, max: 10 }
});

export default knex;