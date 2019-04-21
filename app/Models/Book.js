'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Book extends Model {
	author() {
		return this.belongsTo('App/Models/Author', 'author_id', 'id');
	}
	genres() {
		return this.hasMany('App/Models/Genre', 'id', 'book_id');
	}
	genreList() {
		return this.manyThrough('App/Models/Genre', 'genreList');
	}
}

module.exports = Book
