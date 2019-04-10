
'use strict'

const Book = use('App/Models/Book')

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
}

module.exports = BookController
