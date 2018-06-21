const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const handlebars = require('express-handlebars');
const Role = require('../models/Role');


module.exports = (app, config) => {
    app.engine('hbs', handlebars({
        // helpers: {
        //     trimString: function(passedString) {
        //         var theString = passedString.substring(0,50);
        //         return theString
        //     }
        // },
        extname: '.hbs',
        layoutsDir: 'views/layouts',
        defaultLayout: 'main'
    }));
    app.set('view engine', 'hbs');
    app.use(cookieParser());
    app.use(session({secret: 'S3cr3t', saveUninitialized: false, resave: false}));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req, res, next) => {
        if(req.user) {
            res.locals.user = req.user;

            Role.findOne({ name: 'Admin' }).then((role) => {
                if (!role) {
                    next();
                }

                if (req.user.roles.indexOf(role_.id) !== -1) {
                    req.user.isAdmin = true;
                    req.locals.admin = true;
                }
                next();
            });
        } else {
            next();
        }
    });


    app.use(bodyParser.urlencoded({extended: true}));

    app.use((req, res, next) => {
        if (req.url.startsWith('/public')) {
            req.url = req.url.replace('/public', '');
        }
        next();
    }, express.static(path.normalize(path.join(config.rootPath, 'public'))));
};