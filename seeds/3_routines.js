
exports.seed = function(knex, Promise) {

  return knex('routines').del()
    .then(function () {
      return Promise.all([
        knex('routines').insert([{
          id: 1,
          users_id: 1,
          name: 'Hardcore Core',
          description: 'Intense core workout',
          created_at: new Date('2016-06-29 14:26:16 UTC'),
          updated_at: new Date('2016-06-29 14:26:16 UTC')
        },
        {
          id: 2,
          // users_id: ,
          name: 'Arms',
          description: 'Upper body, biceps, triceps, forearms',
          created_at: new Date('2016-06-29 14:26:16 UTC'),
          updated_at: new Date('2016-06-29 14:26:16 UTC')
        }])
      ])
      .then(() => {
        return knex.raw("SELECT setval('routines_id_seq', (SELECT MAX(id) FROM routines))");
      });
    });
};
