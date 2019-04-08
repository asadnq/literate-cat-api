'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.integer('category_id').unsigned().references('categories.id').onDelete('cascade')
      table.string('name', 120)
      table.text('description')
      table.integer('price').unsigned()
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductsSchema
