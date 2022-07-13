class NewsController {
    // [GET] /news
    index(req, res) {
        res.render('news');
    }

    // [GET] /news/:slug (VD: /news/hoc-f8)
    show(req, res) {
        res.send('Slug of news page');
    }
}

module.exports = new NewsController();
