
module.exports = Backbone.Model.extend({
    urlRoot: '/api/books',
    urlRoot: '/api/books',
    defaults: {
        title: "",
        author: "",
        year: "",
        genre: "",
        user_id: "",
    },
     validation: {
    title: {
      required: true
    },
    author: {
      required: true
    },
    year: {
      required: true
    },
    genre: {
      required: true
    },
    user_id: {
      required: true
    }
});