const mongoose = require('mongoose');

let roleSchema = mongoose.Schema({
    name: { type: mongoose.Schema.Types.String, required: true, unique: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

let Role = mongoose.model('Role', roleSchema);

module.exports = Role;

module.exports.init = () => {
    Role.findOne({ name: 'User' }).then((role) => {
        if (!role) {
            Role.create({ name: 'User' });
        }
    });

    Role.findOne({ name: 'Admin' }).then((role) => {
        if (!role) {
            Role.create({ name: 'Admin' });
        }
    });
};