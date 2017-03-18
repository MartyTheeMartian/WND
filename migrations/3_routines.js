
exports.up = function(knex, Promise) {

  return knex.schema.createTable('routines', (table) => {
    table.increments();
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable();
    table.string('name').notNullable();
    table.integer('status_code').defaultTo(0).notNullable();
    // 0-1: 0 = predefined, 1 = custom
    table.timestamp("created_at").defaultTo(knex.raw('now()')).notNullable();
    table.timestamp("updated_at").defaultTo(knex.raw('now()')).notNullable();
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('routines');
};
