module.exports = {
  development: {
    username: 'postgres',
    password: null,
    database: 'more-recipes',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    use_env_variable: process.env.DATABASE_URL,
    dialect: 'postgres'
  }
};
