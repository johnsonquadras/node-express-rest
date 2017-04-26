var should = require('should');
request = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Book = mongoose.model('Book'),
    agent = request.agent(app);

describe('Book CRUD test', function () {
    it('Should allow a book to be posted and return an _id', function (done) {
        var bookPost = { title: 'test', author: 'test', genre: 'test' };

        agent.post('/api/books')
            .send(bookPost)
            .expect(200)
            .end(function (err, result) {
                result.body.should.have.property['_id'];
                done();
            })
    });

    it('Should allow a book to be posted and return an _id', function (done) {
        var bookPost = { title: 'test', author: 'test', genre: 'test' };

        var bookPost = { title: 'test', author: 'test', genre: 'test' };

        agent.post('/api/books')
            .send(bookPost)
            .expect(200)
            .end(function (err, result) {
                result.body.should.have.property['_id'];
                checkBooks();
            })

        function checkBooks() {
            agent.get('/api/books')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, result) {
                    console.log(result.body.length)
                    result.body.length.should.equal(1);
                    done();
                })
        }

    });

    afterEach(function (done) {
        Book.remove({}).exec();
        done();
    })
});