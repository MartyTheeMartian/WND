
exports.seed = function(knex, Promise) {

  return knex('weight').del()
    .then(function () {
      return Promise.all([
        knex('weight').insert({
          id: 1,
          user_id: 1,
          weight: '175',
          date: '2016-06-29',
          created_at: new Date('2016-06-29 14:26:16 UTC'),
          updated_at: new Date('2016-06-29 14:26:16 UTC')
        })
      ])
      .then(() => {
        return knex.raw("SELECT setval('weight_id_seq', (SELECT MAX(id) FROM weight))");
      });
    });
};
