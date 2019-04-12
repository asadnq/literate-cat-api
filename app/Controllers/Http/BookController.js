
'use strict'

const Book = use('App/Models/Book');
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
 }

module.exports = BookController
