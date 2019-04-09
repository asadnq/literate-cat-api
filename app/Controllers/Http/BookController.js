'use strict'

const Book = use('App/Models/Book')

class BookController {

    async all({request, response}) {
        const books = await Book.all();
        response.send(books);
    }

    async details({params}) {
        const book = await Book.find(params.id);
        return book;
    }
}

module.exports = BookController
