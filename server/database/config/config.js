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
    username: 'postgres',
    password: null,
    database: 'more-recipes-test',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: 'xggivfpa',
    password: 'wY0xbU25wa4UXefGggrAJZk-AFKOs35K',
    database: 'xggivfpa',
    host: 'stampy.db.elephantsql.com',
    dialect: 'postgres'
  }
};
