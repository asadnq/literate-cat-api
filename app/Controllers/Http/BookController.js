
'use strict'

const Book = use('App/Models/Book');
const Genre = use('App/Models/Genre');
const GenreList = use('App/Models/GenreList');
const Database = use('Database');

class BookController {

    async index({request, response}) {
        try {
            const books = await Book.all();
            response.status(200).json({
            	message: 'Book list fetched.',
            	data: books
            });
        } catch(err) {
            console.log(err);
        }
    }

    async show({params, response}) {
        try {
            const book = await Book.find(params.id);

            let genres = await book.genreList().fetch();

            let book_genres = [];
            
            await genres.toJSON().map(item => book_genres.push(item.name));

            response.status(200).json({
            	message: 'Here are your book.',
            	data: {
                    ...book.toJSON(),
                    genre: book_genres
                    }
            });
        } catch(err) {
            console.log(err);
        }
    }

    async getAuthor({params, response}) {
        try {
            const book = await Book.find(params.id);
            const author = await book.author().fetch();

            return response.status(200).json({
                message: 'Here are your author.',
                data: author.toJSON()
            })
        } catch(err) {
            console.log(err);
        }
    }

    async searchBook({params, request, response}) {

        try {
            const fields = [
                        'books.id','books.name', 'books.price', 'books.description',
                        'books.price','books.stock', 'books.cover_image',
                        'authors.name as author'
                         ];

            if(params.name !== '') {
                const books = await Database.select(fields).from('books')
                                .leftJoin('authors', 'authors.id', 'books.author_id')
                                .leftJoin('genres', 'books.id', 'genres.book_id')
                                .leftJoin('genre_lists', 'genres.genre_id', 'genre_lists.id')
                                .where('books.name', 'LIKE', `%${params.name}%`)
                                .orWhere('authors.name', 'LIKE', `%${params.name}%`)
                                .orWhere('genre_lists.name', 'LIKE', `%${params.name}%`);
                if(books.length > 0) {
                    return response.status(200).json({
                        message: 'Search success.',
                        data: books
                    });
                } else {
                    return response.status(200).json({
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
        catch(err) {
            console.log(err);
        }
    }

    async getBooksWithGenre({ params, request, response }) {

        const fields = [
                        'books.id','books.name', 'books.price', 'books.description',
                        'books.price','books.stock', 'books.cover_image',
                        'authors.name as author'
                         ];

        const books = await Database.select(fields).from('books')
                    .leftJoin('genres', 'books.id', 'genres.book_id')
                    .leftJoin('genre_lists', 'genres.genre_id', 'genre_lists.id')
                    .leftJoin('authors', 'authors.id', 'books.author_id')
                    .where('genre_lists.id', params.id);
    
        return response.json(books)
    }

    async getGenre({params, response}) {
        try {
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

            return response.status(200).json({
                message: 'genre fetched',
                data: {...book,
                        genre: list}
            })
        } catch(err) {
            console.log(err);
        }
    }

    async test({response, request, params}) {
        try{
            const books = await Database.select(
                                        'books.id', 'books.name', 'books.price',
                                        'books.description', 'books.cover_image',
                                        'authors.name as author')
                                .from('books')
                                .innerJoin('authors', 'books.author_id', 'authors.id')
                                .where('books.name', 'LIKE', `%${params.name}%`)
                                .orWhere('authors.name', 'LIKE', `%${params.name}%`)
                           
                let result = ["sad"];
                await books.forEach(async book => {
                    let findBook = await Book.find(book.id);
                    result.push("findBook");
                    console.log(result);
                });
                // return result;
            console.log(result);
            return response.json({
                data: result
            })
        }

        catch(err) {
            response.send(err)
        }
    }

 }

module.exports = BookController
