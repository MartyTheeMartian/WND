
exports.seed = function(knex, Promise) {

  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({
          id: 1,
          users_id: 1,
          routines_id: 1,
          created_at: new Date('2016-06-29 14:26:16 UTC'),
          updated_at: new Date('2016-06-29 14:26:16 UTC')
        })
      ])
      .then(() => {
        return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))");
      });
    });
};
