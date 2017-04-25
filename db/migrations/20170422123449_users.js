'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.integer('owner_id');
    table.integer('walker_id');
    table.string('email').unique().notNullable();
    table.specificType('hashed_password', 'char(60)').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
