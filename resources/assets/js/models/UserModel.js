module.exports = Backbone.Collection.extend({
    url: '/api/users',
    model: require("./UserModel")
});