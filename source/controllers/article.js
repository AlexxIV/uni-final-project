const Edit = require('../models/Edit');
const Article = require('../models/Article');

module.exports = {
    createArticle: {
        get: (req, res) => {
            res.render('article/create');
        },
        post: (req, res) => {
                Article.create({ title: req.body.title }).then((newArticle) => {
                    Edit.create({
                        author: req.user.id,
                        article: newArticle._id,
                        content: req.body.content
                    }).then((newEdit) => {
                        newArticle.edits.push(newEdit._id);
                        newArticle.save().then(() => {
                            req.session.msg = { success: 'Article created successfully!' };
                            res.redirect('/');
                        });
                    }).catch(() => {
                        req.session.msg = { error: 'Article was not created!' };
                        res.redirect('/');
                    });
                }).catch(() => {
                    req.session.msg = { error: 'Article was not created!' };
                    res.redirect('/');
                });
            },
    },
    editArticle: {
        get: (req, res) => {
            let id = req.params.id;

            Article.findById(id)
                .populate({path: 'edits', options: {sort: {'creationDate': -1}}})
                .then((article) => {
                    res.render('article/edit', {article});
                });
        },

        post: (req, res) => {
            let id = req.params.id;

            Article.findById(id).then((article) => {
                Edit.create({
                    author: req.user.id,
                    article: article._id,
                    content: req.body.content
                }).then((newEdit) => {
                    article.edits.push(newEdit._id);
                    article.save().then(() => {
                        req.session.msg = { success: 'Article edited successfully!' };
                        res.redirect('/');
                    });
                }).catch(() => {
                    req.session.msg = { error: 'Article was not edited!' };
                    res.redirect('/');
                });
            }).catch(() => {
                req.session.msg = { error: 'Article was not edited!' };
                res.redirect('/');
            });
        }
    },

    getAllArticles: {
     get: (req, res) => {
         Article.find({})
             .collation({ locale: 'en', strength: 2 })
             .sort({ title: 1 })
             .then((articles) => {
                 res.render('article/all-articles', { articles })
             })
     }
    },
    details: {
        get: (req, res) => {
            let articleId = req.params.id;
            Article.findById(articleId).then(article => {
                console.log(article.title);
                res.render('article/details', {article});
                console.log({article})
            })
        }
    }
};