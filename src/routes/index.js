const newRouter = require('./news');
const siteRouter = require('./site');
const courseRouter = require('./course');
const meRouter = require('./me');

function route(app) {
    app.use('/news', newRouter);
    app.use('/me', meRouter);
    app.use('/course', courseRouter);
    app.use('/', siteRouter);
}

module.exports = route;
