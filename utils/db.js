import kn from 'knex';

const knex = kn({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'auction'
  },
  pool: { min: 0, max: 10 }
});

export default knex;
