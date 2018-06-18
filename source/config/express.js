const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const handlebars = require('express-handlebars');


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
        if (req.isAuthenticated()) {
            res.locals.hasUserAccess = true;
        }
        if (req.user && req.user.hasAccess('admin')) {
            res.locals.hasAdminAccess = true;
        }
        next();
    });

    app.use((req, res, next) => {
        if(req.user) {
            res.locals.user = req.user;
        }
        next();
    });
    app.use(bodyParser.urlencoded({extended: true}));

    app.use((req, res, next) => {
        if (req.url.startsWith('/public')) {
            req.url = req.url.replace('/public', '');
        }
        next();
    }, express.static(path.normalize(path.join(config.rootPath, 'public'))));
};