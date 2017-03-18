
exports.up = function(knex, Promise) {

  return knex.schema.createTable('weight', (table) => {
    table.increments();
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable();
    table.string('weight').defaultTo('').notNullable();
    table.timestamp("created_at").defaultTo(knex.raw('now()')).notNullable();
    table.timestamp("updated_at").defaultTo(knex.raw('now()')).notNullable();
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('weight');
};
