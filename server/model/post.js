const mongoose=require('mongoose')
const Schema=mongoose.Schema

const postSchema=new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, //Many-to-one
    likes: {
        type: Schema.Types.ObjectId,
        ref: 'Like'
    }, //Many-to-many
    tags: [{
        type: String
    }],
    caption: {
        type: String,
        trim: true
    },
    imageURL: {
        type: String,
        required: true
    },
    imageID: {
        type: String,
        required: true
    },
    location: {
        type: String,
    } 
},
    {
        timestamps: true
    }
)

postSchema.index({ caption: -1}) //DESC

module.exports = mongoose.model('Post', postSchema)