const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    title:{
        type: String,
        required: true
    },
    contentText:{
        type: String,
        required: true
    },
    points:{
        type: Number
    }
})

module.exports = mongoose.model('post', postSchema)