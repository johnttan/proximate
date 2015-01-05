var config = require('../config/config');
var knex = require('knex')({
  client: 'mysql',
  connection: config.mysqlConnection,
});
var bookshelf = require('bookshelf')(knex);
module.exports = bookshelf;
var seed = require('./seed');

if (config.resetDatabaseOnLoad) {
  // Drop any existing db tables to ensure increment values reset
  bookshelf.knex.schema.dropTableIfExists('participants')
  .then(function() {
    return bookshelf.knex.schema.dropTableIfExists('events');
  })
  .then(function() {
    return bookshelf.knex.schema.dropTableIfExists('admins');
  })
  .then(function() {
    return bookshelf.knex.schema.dropTableIfExists('events_participants');
  })
  .then(function() {
    return bookshelf.knex.schema.dropTableIfExists('beacons');
  })
  .then(function() {
    return bookshelf.knex.schema.dropTableIfExists('beacons_events');
  })

  // Create our tables
  .then(function() {
    return bookshelf.knex.schema.createTable('admins', function(t) {
      t.increments('id').primary();
      t.string('name');
    });
  })
  .then(function() {
    return bookshelf.knex.schema.createTable('participants', function(t) {
      t.increments('id').primary();
      t.string('name');
      t.string('email');
      t.string('device_id').unique();
    });
  })
  .then(function() {
    return bookshelf.knex.schema.createTable('events', function(t) {
      t.increments('id').primary();
      t.string('name');
      t.dateTime('start_time');
      t.integer('admin_id').notNullable();
    });
  })
  .then(function() {
    return bookshelf.knex.schema.createTable('events_participants', function(t) {
      t.increments('id').primary();
      t.integer('event_id').notNullable();
      t.integer('participant_id').notNullable();
      t.text('status');
      t.dateTime('checkin_time');
    });
  })
  .then(function() {
    return bookshelf.knex.schema.createTable('beacons', function(t) {
      t.increments('id').primary();
      t.text('uuid');
      t.text('identifier');
      t.integer('major');
      t.integer('minor');
      t.integer('admin_id').notNullable();
    });
  })
  .then(function() {
    return bookshelf.knex.schema.createTable('beacons_events', function(t) {
      t.increments('id').primary();
      t.integer('beacon_id');
      t.integer('event_id');
    });
  })

  // Once our tables have been created, fill them with data
  .then(seed.seedTables);

}
