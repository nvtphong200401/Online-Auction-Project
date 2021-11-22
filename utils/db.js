import kn from 'knex';

const knex = kn({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'actiondb'
  },
  pool: { min: 0, max: 10 }
});

export default knex;