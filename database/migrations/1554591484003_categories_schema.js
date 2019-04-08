'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoriesSchema extends Schema {
  up () {
    this.create('categories', (table) => {
      table.increments()
      table.string('name', 20).unique()
      table.timestamps().defaultTo(this.fn.now())
    })
  }

  down () {
    this.drop('categories')
  }
}

module.exports = CategoriesSchema
