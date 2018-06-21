const controllers = require('../controllers/index');
const permissions = require('./permissions');
const auth = require('../utilities/authorization');

module.exports = (app) => {
    app.get('/', controllers.home.get);

    app.get('/user/login', controllers.user.login.get);
    app.post('/user/login', controllers.user.login.post);

    app.get('/article/create', controllers.article.createArticle.get);
    app.post('/article/create', controllers.article.createArticle.post);
    app.get('/article/all', controllers.article.getAllArticles.get);
    app.get('/article/details/:id', controllers.article.details.get);
};