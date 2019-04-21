'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Genre extends Model {
	genreList() {
		return this.hasOne('App/Models/GenreList', 'genre_id', 'id')
	}
}

module.exports = Genre
