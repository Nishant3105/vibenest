const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    bio: {
        type: String,
    },
    imageId: {
        type: String
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    liked: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema)