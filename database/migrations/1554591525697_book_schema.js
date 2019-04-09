'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsSchema extends Schema {
  up () {
    this.create('books', (table) => {
      table.increments();
      table.integer('category_id').unsigned();
      table.integer('author_id').unsigned();
      table.string('name', 120);
      table.text('description');
      table.integer('price').unsigned();
      table.integer('stock').unsigned();
      table.string('cover_image');
      table.timestamps();
    })
  }

  down () {
    this.drop('books')
  }
}

module.exports = ProductsSchema
