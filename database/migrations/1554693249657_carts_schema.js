'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CartSchema extends Schema {
  up () {
    this.create('carts', (table) => {
      table.increments();
      table.integer('book_id').unsigned();
      table.integer('quantity');
      table.integer('price_sum');
      table.timestamps();
    })
  }

  down () {
    this.drop('carts')
  }
}

module.exports = CartSchema
