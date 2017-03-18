'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection:'postgres://localhost/wnd'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/wnd'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
