
module.exports = new Marionette.AppRouter({
    controller: require('./controller'),
    appRoutes: {
        "": "index",
        "books/create": "book_add",
        "books": "books",
        "books/:id": "book",
        "books/:id/edit": "book_edit",     
        "bookregister/:id/delete": "register_delete",      
        "books/:id/delete": "book_delete",
        "users": "users",
        "users/:id": "user",
        "users/:id/delete": "user_delete",
    }
});