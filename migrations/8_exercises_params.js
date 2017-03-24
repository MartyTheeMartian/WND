
exports.up = function(knex, Promise) {

  return knex.schema.createTable('exercises_params', (table) => {
    table.increments();
    table.integer('users_id').references('id').inTable('users').onDelete('CASCADE').notNullable();
    table.integer('routines_exercises_id').references('id').inTable('routines_exercises').onDelete('CASCADE').notNullable();
    table.integer('sets').defaultTo(null);
    table.integer('reps').defaultTo(null);
    table.integer('duration').defaultTo(null);
    table.timestamp("created_at").defaultTo(knex.raw('now()')).notNullable();
    table.timestamp("updated_at").defaultTo(knex.raw('now()')).notNullable();
  });

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('exercises_params');
};
