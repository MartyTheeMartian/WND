'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection:'postgres://localhost/wnd_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/wnd_test'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
