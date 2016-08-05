module.exports = Backbone.Collection.extend({
    url: '/api/books',
    model: require("./BookModel")
});