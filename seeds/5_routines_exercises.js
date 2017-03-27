
exports.seed = function(knex, Promise) {

  return knex('routines_exercises').del()
    .then(function () {
      return Promise.all([
        knex('routines_exercises').insert({
          id: 1,
          routines_id: 1,
          exercises_id: 1,
          users_id: 1,
          created_at: new Date('2016-06-29 14:26:16 UTC'),
          updated_at: new Date('2016-06-29 14:26:16 UTC')
        })
      ])
      .then(() => {
        return knex.raw("SELECT setval('routines_exercises_id_seq', (SELECT MAX(id) FROM routines_exercises))");
      });
    });
};
