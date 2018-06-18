const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const User = require ('../models/User');
const encryption = require ('../utilities/encryption');

module.exports = (config) => {
    mongoose.connect(config.connectionString);

    let database = mongoose.connection;
    database.once('open', (err) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log('Connected!');
        seedAdmin();
        seedUser();
    });

    database.on('error', (err) => {
        console.log(err)
    });
}
function seedAdmin() {
    return new Promise((resolve, reject) => {
        User.find({username: 'admin'}).then(users => {
            if (users.length === 0) {
                let pwd = 'admin';
                let salt = encryption.generateSalt();
                let hashedPwd = encryption.generateHashedPassword(salt, pwd);

                let adminData = {
                    username: 'admin',
                    salt: salt,
                    password: hashedPwd,
                    roles: ['Admin']
                };

                User.create(adminData).then(admin => {
                    console.log(`Seeded admin: ${admin.username}`);
                    resolve(admin._id);
                });
            } else {
                users.forEach(element => {
                    console.log(`There are existing admins: ${element.username}`);
                });
            }
        });
    });
}
function seedUser() {
    return new Promise((resolve, reject) => {
        User.find({roles: []}).then(users => {
            if (users.length === 0) {
                let pwd = 'asd';
                let salt = encryption.generateSalt();
                let hashedPwd = encryption.generateHashedPassword(salt, pwd);

                let userData = {
                    username: 'asd',
                    salt: salt,
                    password: hashedPwd,
                    roles: []
                };

                User.create(userData).then(user => {
                    console.log(`Seeded user: ${user.username}`);
                    resolve(user._id);
                });
            } else {
                users.forEach(element => {
                    console.log(`There are existing users: ${element.username}`);
                });
            }
        });
    });
}