
exports.up = function(knex, Promise) {

  return knex.schema.createTable('exercises', (table) => {
    table.increments();
    table.integer('users_id').references('id').inTable('users').defaultTo(null);
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.integer('status').defaultTo(1).notNullable();
    // 1-3: 1 = dynamic, 2 = static, 3 = cardio
    table.integer('exercise_type').defaultTo(0);
    table.timestamp("created_at").defaultTo(knex.raw('now()')).notNullable();
    table.timestamp("updated_at").defaultTo(knex.raw('now()')).notNullable();
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('exercises');
};
