'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GenresSchema extends Schema {
  up () {
    this.create('genres', (table) => {
      table.increments();
      table.integer('user_id').unsinged();
      table.integer('genre_id').unsinged();
      table.timestamps();
    })
  }

  down () {
    this.drop('genres')
  }
}

module.exports = GenresSchema