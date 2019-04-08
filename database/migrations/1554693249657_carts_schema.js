'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CartSchema extends Schema {
  up () {
    this.create('carts', (table) => {
      table.increments();
      table.integer('product_id').unsigned().references('products.id').onDelete('cascade');
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
