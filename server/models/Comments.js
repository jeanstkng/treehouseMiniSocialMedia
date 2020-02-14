const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    postParent:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    },
    content:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('comment', commentSchema)