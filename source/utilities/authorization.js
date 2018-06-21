const Role = require('../models/Role');
const Article = require('../models/Article');

module.exports = {
    isAuth: (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/user/login');
        }
    },

    isInRole: (role) => {
        return (req, res, next) => {
            if (req.user) {
                Role.findOne({ name: role }).then((role) => {
                    if (!role) {
                        res.redirect('/user/login');
                        return;
                    }

                    let isInRole = req.user.roles.indexOf(role._id) !== -1;
                    if (isInRole) {
                        next();
                    } else {
                        res.redirect('/user/login');
                        return;
                    }
                });
            } else {
                res.redirect('/user/login');
            }
        };
    },

    isLocked: (req, res, next) => {
        let id = req.params.id;

        Article.findById(id).then((article) => {
            if (!article.locked) {
                next();
            } else {
                if (req.user.isAdmin) {
                    next();
                } else {
                    req.session.msg = { error: 'This article is locked for editing!' };
                    res.redirect('/');
                }
            }
        });
    }
};