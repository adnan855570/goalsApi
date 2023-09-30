/* This code is defining a schema for a goal in a MongoDB database using Mongoose. */
const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref : 'User'
    },
    text : {
        type : String ,
        required : [true , 'Please add a text value']
    },
},
{
    timestamps : true,
}
)

module.exports = mongoose.model('Goal' , goalSchema); // goal model from the schema created