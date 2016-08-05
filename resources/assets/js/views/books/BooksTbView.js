module.exports = Marionette.CompositeView.extend({
    tagName: "table",
    className: "table table-responsive table-hover table-bordered",
    template: "books/Thead",
    childView: require('./BooksThead'),
});