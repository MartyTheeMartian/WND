
exports.up = function(knex, Promise) {

  return knex.schema.createTable('log', (table) => {
    table.increments();
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable();
    table.integer('routine_id').references('id').inTable('routines').onDelete('CASCADE').notNullable();
    table.string('routine_name').references('name').inTable('routines').onDelete('CASCADE').notNullable();
    table.integer('rating').defaultTo(0).notNullable(); // 0-5
    table.dateTime('date_time').notNullable();
    table.timestamp("created_at").defaultTo(knex.raw('now()')).notNullable();
    table.timestamp("updated_at").defaultTo(knex.raw('now()')).notNullable();
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('log');
};
