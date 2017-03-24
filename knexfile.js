'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection:'postgres://localhost/wnd_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/wnd_test',
    migrations: {
      directory: __dirname + '/migrations'
    },
    seeds: {
      directory: __dirname + '/seeds'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + '/migrations'
    },
    seeds: {
      directory: __dirname + '/seeds'
    }
  }
};
