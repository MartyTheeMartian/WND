
exports.seed = function(knex, Promise) {

  return knex('exercises_params').del()
    .then(function () {
      return Promise.all([
        knex('exercises_params').insert({
          id: 1,
          users_id: 1,
          routines_exercises_id: 1,
          sets: 3,
          reps: 20,
          duration: null,
          created_at: new Date('2016-06-29 14:26:16 UTC'),
          updated_at: new Date('2016-06-29 14:26:16 UTC')
        })
      ])
      .then(() => {
        return knex.raw("SELECT setval('exercises_params_id_seq', (SELECT MAX(id) FROM exercises_params))");
      });
    });
};
