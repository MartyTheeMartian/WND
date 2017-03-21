
exports.up = function(knex, Promise) {

  return knex.schema.createTable('weight', (table) => {
    table.increments();
    table.integer('users_id').references('id').inTable('users').onDelete('CASCADE').notNullable();
    table.integer('weight').defaultTo(0).notNullable();
    table.date('date').notNullable();
    table.timestamp("created_at").defaultTo(knex.raw('now()')).notNullable();
    table.timestamp("updated_at").defaultTo(knex.raw('now()')).notNullable();
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('weight');
};
