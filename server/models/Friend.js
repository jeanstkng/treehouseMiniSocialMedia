const mongoose = require('mongoose')

const friendSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    friends: [{
        person: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        }
    }]
})

module.exports = mongoose.model('friend', friendSchema)