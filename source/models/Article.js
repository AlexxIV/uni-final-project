const mongoose = require('mongoose');

let articleSchema = mongoose.Schema({
    title: { type: mongoose.Schema.Types.String, required: true },
    lockedStatus: { type: mongoose.Schema.Types.Boolean, default: false},
    edits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Edit.js', required: true }],
});

let Article = mongoose.model('Article', articleSchema);

module.exports = Article;