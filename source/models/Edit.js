const mongoose = require('mongoose');

let editSchema = mongoose.Schema({
    author: { type: mongoose.Schema.Types.String, required: true },
    creationDate: { type: mongoose.Schema.Types.Date, default: Date.now },
    article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    content: { type: mongoose.Schema.Types.String, required: true}
});

let Edit = mongoose.model('Edit', editSchema);

module.exports = Edit;