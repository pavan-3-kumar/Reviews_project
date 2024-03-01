const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    content:{
        type : String , 
        required : true
    },
    // comment belongs to user i.e have to keep link with 
    // which user posted and under which post this comment was commented
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }
},{
    timestamps: true
});

const Comment = mongoose.model('Comment' , commentSchema);
module.exports = Comment;