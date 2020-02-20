const mongoose = require('mongoose')

const requestFriendSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    isCanceled: {
        type: Boolean,
        required: true
    },
    isAccepted: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('requestFriend', requestFriendSchema)