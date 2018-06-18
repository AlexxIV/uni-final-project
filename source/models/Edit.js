const mongoose = require('mongoose');

let editSchema = mongoose.Schema({
    author: { type: mongoose.Schema.Types.String, required: true },
    creationDate: { type: mongoose.Schema.Types.Date, default: Date.now },
    content: { type: mongoose.Schema.Types.String, required: true}
});

let Edit = mongoose.model('Edit', editSchema);

module.exports = Edit;