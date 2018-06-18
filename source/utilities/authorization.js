module.exports = (user) => {
    let isAdmin = user.roles.indexOf('Admin') >= 0;

    return isAdmin;
};