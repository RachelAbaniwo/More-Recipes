'use strict';

require('dotenv').config();

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
    username: 'xggivfpa',
    password: 'wY0xbU25wa4UXefGggrAJZk-AFKOs35K',
    database: 'xggivfpa',
    host: 'stampy.db.elephantsql.com',
    dialect: 'postgres'
  }
};