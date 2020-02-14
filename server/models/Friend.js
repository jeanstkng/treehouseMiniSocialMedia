const mongoose = require('mongoose')

const friendSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    friends: [{
        person: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        isAccepted: {
            type: Boolean
        }
    }]
})

module.exports = mongoose.model('friend', friendSchema)