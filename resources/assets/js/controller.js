module.exports = {
    
    index: function () {
            var IndexView = require("./views/welkome/WelcomeView");
            App.content.show(new WelcomeView());
        },
        //books
        books: function () {
            Loading.show();
            var BookList = require("./models/BookCollection");
            var books = new BookList();
            books.fetch({
                success: function (coll) {
                    var BooksView = require('./views/books/BooksTbView');
                    App.content.show(new BooksView({
                        collection: coll
                    }));
                    Loading.hide();
                }
            });

        },
        book: function (id) {
            Loading.show();
            var BookModel = require("./models/BookModel");
            var book = new BookModel({id: id});
            book.fetch({
                success: function (book) {
                    var BookView = require("./views/books/BookDetailView");
                    App.content.show(new BookDetailView({
                        model: book
                    }));
                    Loading.hide();
                }
            });
        },
        book_edit: function (id) {
            Loading.show();
            var BookModel = require("./models/BookModel");
            var book = new BookModel({id: id});
            book.fetch({
                success: function (book) {
                    var BookEditView = require("./views/books/BookEditView");
                    App.content.show(new BookEditView({
                        model: book
                    }));
                    Loading.hide();
                }
            });
        },
        book_delete: function (id) {
            Loading.show();
            var BookModel = require("./models/BookModel");
            var book = new BookModel({id: id});
            book.destroy({
                success: function () {
                    Backbone.history.navigate('/books', {
                        trigger: true
                    });
                }
            });
        },
        book_add: function () {
            var BookModel = require("./models/BookModel");
            var book = new BookModel();
            var BookEditView = require("./views/books/BookEditView");
            App.content.show(new BookEditView({ model: book}));
        },
        //
        register_delete: function (id) {
            var RecordModel = require("./models/RegisterModel");
            Loading.show();
            var returns = new ReturnModel({id: id});
            returns.destroy({
                success: function () {
                    Backbone.history.history.back();
                }
            });
        },    
        //user
        users: function () {
            Loading.show();
            var UserList = require("./models/UserCollection");
            var users = new UserList();
            users.fetch({
                success: function (coll) {
                    App.content.show(new UsersView({
                        collection: coll
                    }));
                    Loading.hide();
                }
            });
        },
        user:function (id) {
            Loading.show();
            var UserModel = require("./models/UserModel");
            var user = new UserModel({id: id});
            user.fetch({
                success: function (user) {
                    App.content.show(new UserDetailView({
                        model: user,
                        collection: new Backbone.Collection(user.attributes.books)
                    }));
                    Loading.hide();
                }
            })
        },
        user_delete: function (id) {
            Loading.show();
            var UserModel = require("./models/UserModel");
            var user = new UserModel({id: id});
            user.destroy({
                success: function () {
                    Backbone.history.navigate('/users', {
                        trigger: true
                    });
                }
            });
        }
    
}