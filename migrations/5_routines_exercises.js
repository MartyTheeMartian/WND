
exports.up = function(knex, Promise) {

  return knex.schema.createTable('routines_exercises', (table) => {
    table.increments();
    table.integer('routines_id').references('id').inTable('routines').onDelete('CASCADE').notNullable();
    table.integer('exercises_id').references('id').inTable('exercises').onDelete('CASCADE').notNullable();
    table.integer('sets').defaultTo(null);
    table.integer('reps').defaultTo(null);
    table.integer('duration').defaultTo(null);
    table.timestamp("created_at").defaultTo(knex.raw('now()')).notNullable();
    table.timestamp("updated_at").defaultTo(knex.raw('now()')).notNullable();
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('routines_exercises');
};
