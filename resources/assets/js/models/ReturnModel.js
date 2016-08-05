module.exports = Backbone.Collection.extend({
     urlRoot: '/api/users',
    model: require("./BookModel")
});