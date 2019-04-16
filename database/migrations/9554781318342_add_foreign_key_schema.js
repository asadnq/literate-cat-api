'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddForeignKeySchema extends Schema {
  up () {
    this.alter('books', (table) => {
      table.foreign('category_id').references('categories.id')
        .onDelete('cascade').onUpdate('cascade');
      table.foreign('author_id').references('authors.id')
        .onDelete('cascade').onUpdate('cascade');
    });
    this.alter('carts', (table) => {
      table.foreign('book_id').references('books.id')
              .onDelete('cascade').onUpdate('cascade');
      table.foreign('user_id').references('users.id')
              .onDelete('cascade').onUpdate('cascade');
    });
    this.alter('genres', table => {
      table.foreign('book_id').references('books.id')
              .onDelete('cascade').onUpdate('cascade');
      table.foreign('genre_id').references('genre_lists.id')
              .onDelete('cascade').onUpdate('casacade');
    });
  }

  down () {
    this.alter('books', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddForeignKeySchema
