
var should = require('should');
var sinon = require('sinon');

describe('Book controller tests', function () {

    describe('Add book', function () {
        it('should not allow an empty title on POST', function () {
            var Book = function (book) {
                this.save = function () { }
            };

            var req = {
                body: {
                    author: "John"
                }
            };

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            var bookController = require('../Controllers/bookController')(Book);
            bookController.post(req, res);

            res.status.calledWith(400).should.equal(true, 'Bad status' + res.status.args[0]);
            res.send.calledWith('Title is required').should.equal(true);
        });

        it('should add successfully', function () {
            var Book = function () {
                this.save = function () { }
            };

            var req = {
                body: {
                    author: 'John',
                    title: 'Test'
                }
            };

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            var bookController = require('../Controllers/bookController')(Book);
            bookController.post(req, res);

            res.status.calledWith(201).should.equal(true, 'Bad status' + res.status.args[0]);
           // res.send.calledWith(Book).should.equal(true);

        })
    });
});