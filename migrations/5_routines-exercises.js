
exports.up = function(knex, Promise) {

  return knex.schema.createTable('routines-exercises', (table) => {
    table.increments();
    table.integer('users_id').references('id').inTable('users').onDelete('CASCADE');
    table.integer('routines_id').references('id').inTable('routines').onDelete('CASCADE').notNullable();
    table.integer('exercises_id').references('id').inTable('exercises').onDelete('CASCADE').notNullable();
    table.timestamp("created_at").defaultTo(knex.raw('now()')).notNullable();
    table.timestamp("updated_at").defaultTo(knex.raw('now()')).notNullable();
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('routines-exercises');
};
