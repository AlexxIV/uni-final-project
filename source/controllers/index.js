const homeController = require('./home');
const userController = require('./user');
const articleController = require('./article');

module.exports = {
    user: userController,
    home: homeController,
    article: articleController
};