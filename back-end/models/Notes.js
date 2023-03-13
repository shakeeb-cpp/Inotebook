const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    // user: it is used to display the notes only to that user to which it associated and will be hidden from others users
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: 'General'
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('notes', NotesSchema);