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
            Article.findById(articleId)
            .populate({ path: 'edits', options: { sort: { 'creationDate': -1 } } })
            .then((article) => {
                if (article.length === 0 || !article) {
                    req.session.msg = { error: 'Article was not found!' };
                    res.redirect('/');
                    return;
                }
                let latestEdit = article.edits[0].content.split('\r\n\r\n');
                article['content'] = latestEdit;
                res.render('article/details', { article });
            }).catch(() => {
                res.sendStatus(400);
            });
        }
    },
    getLatest: {
        get: (req,res) => {
            Article.find({})
            .sort({ creationDate: -1 })
            .limit(1)
            .populate({ path: 'edits', options: { sort: {'creationDate': -1 } } })
            .then((found) => {
                if (found.length === 0 || !found) {
                    req.session.msg = { error: 'Article was not found!' };
                    res.redirect('/');
                    return;
                }

                let article = found[0];
                let latestEdit = article.edits[0].content.split('\r\n\r\n');
                article['content'] = latestEdit;
                res.render('') // TODO
            })
        }
    }
    
};