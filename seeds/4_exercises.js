require('isomorphic-fetch');

const promises = [];
const filtered = [];

for (let i = 1; i <= 21; i++) {
  promises.push(fetch(`https://wger.de/api/v2/exercise/?page=${i}`)
    .then(res => {
      return res.json();
    })
    .then(val => {
      return val.results.filter(x => x.equipment.length === 0 || x.equipment.indexOf(4) !== -1 || x.equipment.indexOf(5) !== -1 || x.equipment.indexOf(6) !== -1 || x.equipment.indexOf(7) !== -1);
    })
  );
}

Promise
.all(promises)
.then(res => {
  const exercises = [];
  for (let i = 0; i < promises.length; i++) {
    exercises.push(res[i]);
  }
  return exercises;
})
.then((fin) => {
  return fin.reduce((a, b) => [...a, ...b]);
})
.then((val) => {
  val.forEach(x => filtered.push({
    name: x.name,
    description: x.description,
    status: x.status,
    sets: 0,
    reps: 0,
    created_at: new Date('2016-06-29 14:26:16 UTC'),
    updated_at: new Date('2016-06-29 14:26:16 UTC')
    }));
})

exports.seed = function(knex, Promise) {

  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert(filtered)
      ])
      .then(() => {
        return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))");
      });
    });
};
