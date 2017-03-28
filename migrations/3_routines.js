
exports.up = function(knex, Promise) {

  return knex.schema.createTable('routines', (table) => {
    table.increments();
    table.integer('users_id').references('id').inTable('users');
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.timestamp("created_at").defaultTo(knex.raw('now()')).notNullable();
    table.timestamp("updated_at").defaultTo(knex.raw('now()')).notNullable();
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('routines');
};
