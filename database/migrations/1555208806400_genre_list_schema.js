'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GenreListSchema extends Schema {
  up () {
    this.create('genre_lists', (table) => {
      table.increments();
      table.string('name');
      table.timestamps();
    })
  }

  down () {
    this.drop('genre_lists')
  }
}

module.exports = GenreListSchema
