'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Author extends Model {
	
	books() {
		return this.hasMany('App/Models/Book', 'id', 'author_id');
	}
}

module.exports = Author
