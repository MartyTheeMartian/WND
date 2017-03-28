require('isomorphic-fetch');
exports.seed = function(knex, Promise) {
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
  return Promise
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
      // users_id: 1,
      name: x.name,
      description: x.description,
      exercise_type: x.status,
      status: 1,
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC')
      }));
  })
  .then(() => {
    return knex('exercises').del()
  })
  .then(() => {
    let mappedFiltered = filtered.map(x => knex('exercises').insert(x));
    return Promise.all(mappedFiltered)
  })
  .catch((err) => {
    console.error(err);
  })
  .then(() => {
    return knex.raw("SELECT setval('exercises_id_seq', (SELECT MAX(id) FROM exercises))");
  });
};
