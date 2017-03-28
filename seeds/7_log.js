
exports.seed = function(knex, Promise) {

  return knex('log').del()
    .then(function () {
      return Promise.all([
        knex('log').insert({
          id: 1,
          users_id: 1,
          routines_id: 1,
          rating: 4,
          notes: 'Workout was intense. I made sweat.',
          date: '2016-06-29',
          created_at: new Date('2016-06-29 14:26:16 UTC'),
          updated_at: new Date('2016-06-29 14:26:16 UTC')
        })
      ])
      .then(() => {
        return knex.raw("SELECT setval('log_id_seq', (SELECT MAX(id) FROM log))");
      });
    });
};
