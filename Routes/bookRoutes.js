var express = require('express');
var Book = require('../models/bookModel');

var routes = function () {
    var bookRouter = express.Router();

    bookRouter.use('/:bookId', function (req, res, next) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err) {
                res.status(500).send(err);
            }
            else if (book) {
                req.book = book;
                next();
            } else {
                res.status(404).send('No book found');
            }

        });
    });
    var bookController =  require('../Controllers/bookController.js')(Book);
    bookRouter.route('/')
        .get(bookController.get)
        .post(bookController.post);


    bookRouter.route('/:bookId')
        .get(function (req, res) {
            res.json(req.book);
        }).put(function (req, res) {
            var book = req.book;
            book.title = req.body.title;
            book.author = req.body.author;
            book.genre = req.body.genre;

            book.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                }
                res.json(book);
            });

        }).patch(function (req, res) {

            if(req.body.id)
                 delete req.body.id;

            var book = req.book;
            for (var p in book) {

                if (req.body[p])
                    book[p] = req.body[p];
            }
            book.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                }
                res.json(book);
            });
        })
        .delete(function(req, res) {
            var book = req.book;
            book.remove(function(err) {
                if(err) {
                    res.status(500).send(err);
                } else {
                    res.status(204);
                }
            })
        });

    return bookRouter;
}

module.exports = routes;