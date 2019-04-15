
'use strict'

const Book = use('App/Models/Book');
const Genre = use('App/Models/Genre');
const GenreList = use('App/Models/GenreList');
const Database = use('Database');

class BookController {

    async index({request, response}) {
        const books = await Book.all();
        response.status(200).json({
        	message: 'Book list fetched.',
        	data: books
        });
    }

    async show({params, response}) {
        const book = await Book.find(params.id);
        response.status(200).json({
        	message: 'Here are your book.',
        	data: book
        });
    }

    async getAuthor({params, response}) {
        const book = await Book.find(params.id);
        const author = await book.author().fetch();

        response.status(200).json({
            message: 'Here are your author.',
            data: author.toJSON()
        })
    }

    async searchBook({params, request, response}) {

        
        if(params.name !== '') {
            const books = await Database.select('*').from('authors')
                            .rightJoin('books', 'books.author_id', 'authors.id')
                            .where('books.name', 'LIKE', `%${params.name}%`)
                            .orWhere('authors.name', 'LIKE', `%${params.name}%`);
            if(books.length > 0) {
                response.status(200).json({
                    message: 'Search success.',
                    data: books
                });
            } else {
                response.status(200).json({
                    message: 'Item not found'
                })
            }
        } else {
            const books = await Book.all();

            response.status(200).json({
                message: 'Search param is empty, fetching all books data.',
                data: books
            })
        }
    }

    async getGenre({params, response}) {
        const genre = await Database
                        .select('genre_lists.name')
                        .from('genre_lists')
                        .leftJoin('genres', 'genre_lists.id', 'genres.genre_id')
                        .leftJoin('books', 'books.id', 'genres.book_id')
                        .where('books.id', params.id);


        const find_book = await Book.find(params.id);

        const book = find_book.toJSON();

        let list = [];

        genre.map(g => list.push(g.name));

        response.status(200).json({
            message: 'genre fetched',
            data: {...book,
                    genre: list}
        })
    }
 }

module.exports = BookController
