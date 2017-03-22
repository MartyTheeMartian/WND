
exports.up = function(knex, Promise) {

  return knex.schema.createTable('log', (table) => {
    table.increments();
    table.integer('users_id').references('id').inTable('users').onDelete('CASCADE').notNullable();
    table.integer('routines_id').references('id').inTable('routines').onDelete('CASCADE').notNullable();
    table.integer('rating').defaultTo(0).notNullable(); // 0-5
    table.text('notes').defaultTo('');
    table.date('date').notNullable();
    table.timestamp("created_at").defaultTo(knex.raw('now()')).notNullable();
    table.timestamp("updated_at").defaultTo(knex.raw('now()')).notNullable();
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('log');
};
