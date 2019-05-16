'use strict';

const Book = use('App/Models/Book');
const Genre = use('App/Models/Genre');
const GenreList = use('App/Models/GenreList');
const Database = use('Database');

class BookController {
  async index({ request, response }) {
    try {
      const getRequest = request.get();
      const page = getRequest.page || 1;
      const limit = getRequest.limit || 10;

      const query = Book.query()
        .select(
          'books.*',
          'genre_lists.name as genre_name',
          'authors.name as author'
        )
        .from('books')
        .leftJoin('authors', 'authors.id', 'books.author_id')
        .leftJoin('genres', 'genres.book_id', 'books.id')
        .leftJoin('genre_lists', 'genre_lists.id', 'genres.genre_id');
      if (getRequest.name) {
        query
          .where('books.name', 'LIKE', `%${getRequest.name}%`)
          .orWhere('authors.name', 'LIKE', `%${getRequest.name}%`)
          .orWhere('genre_lists.name', 'LIKE',`%${getRequest.name}%`)
      }
      if (getRequest.author) {
        query.where('authors.name', 'LIKE', `%${getRequest.author}%`);
      }
      if (getRequest.genre) {
        if (typeof getRequest.genre == 'number') {
          query.where('genre_lists.name', getRequest.genre);
        } else {
          const genres = Array.from(getRequest.genre);
          query.whereIn('genre_lists.id', genres);
        }
      }

      query.with('author');
      query.with('genres');
      const books = await query.paginate(page, limit);
      response.status(200).json(books);
    } catch (err) {
      console.log(err);
    }
  }

  async show({ params, response }) {
    try {
      let query = Book.query();

      query.with('genres').fetch();

      const book = await query.where('id', params.id).first();

      return response.status(200).json({
        message: 'Here are your book.',
        data: book
      });
    } catch (err) {
      console.log(err);
    }
  }

  async getAuthor({ params, response }) {
    try {
      const book = await Book.find(params.id);
      const author = await book.author().fetch();

      return response.status(200).json({
        message: 'Here are your author.',
        data: author.toJSON()
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = BookController;
