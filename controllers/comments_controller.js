const Comment = require('../models/comment_data');
const Post = require('../models/task_data');
const { post } = require('../routes');
module.exports.create_comment = async function(req , res){
    const post = await Post.findById(req.body.postid);
    if(post){
       const comment = await Comment.create({
            content :  req.body.commentdata,
            user : req.user._id,
            post : req.body.postid,
        });
    //    console.log(post);
        post.comments.push(comment);
        post.save();
        res.redirect('/');
    }           
}

module.exports.delete_comment = async function(req , res){
    const comment_id = req.query.id;
    const comment = await Comment.findById(comment_id);
    if(comment.user == req.user.id)
    {
        const post_id = comment.post;
        await Comment.deleteOne({_id:comment_id});
        // const post_find = await Post.findById();
        // we can check the id of the post either present or not 
        // and then continue with updateone . if we use only updateone method
        // if the document is not present in the database it wont give the error
        await Post.updateOne({_id : post_id},{$pull:{comments:comment_id}})
        // this pull method remove all the comments with the given id
    }
    res.redirect('back');
}