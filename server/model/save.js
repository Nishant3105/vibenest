const mongoose=require('mongoose')
const Schema=mongoose.Schema

const saveSchema=new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, //Many-to-one
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }, //Many-to-one
})

module.exports = mongoose.model('Save', saveSchema)