const Edit = require('../models/Edit');
const Article = require('../models/Article');

module.exports = {
    createArticle: {
        get: (req, res) => {
            res.render('article/create');
        },
        post: (req, res) => {
            let inputData = req.body;
            let editData = {
                author: req.user.username,
                creationDate: Date.now(),
                content: inputData.content
            };

            Edit.create(editData).then(edit => {
                let articleData = {
                    title: inputData.title,
                    lockedStatus: false,
                    edits: edit
                };
                Article.create(articleData).then(article => {
                    res.redirect('/');
                })
            });
        }
    },
    getAllArticles: {
        get: (req, res) => {
            let queryData = req.query;

            Article.find()
                .then(articles => {
                   res.render('article/list', {articles})
                })
        }
    },
    details: {
        get: (req, res) => {
            console.log(req.params.id);
        }
    }
};