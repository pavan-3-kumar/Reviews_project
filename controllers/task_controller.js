const Task = require('../models/task_data');
const Comment = require('../models/comment_data');
module.exports.create_task = async function(req , res){
    // console.log(req.user);
    const added= await Task.create({task:req.body.task, user : req.user._id});
    // console.log(added);
        // if(req.xhr){return res.status(200).json({
        //     data:added 
        // });}
     req.flash('success' , 'Post Uploaded');
     return res.redirect('back');   
}

module.exports.delete_task = async function(req,res)
{
    // here we can use both params and query but using the params
    // we can get only the data realted to the parameters that we mentioned
    // like app.get('/delet-task/task') and in home.ejs file in <a> tag href="/delete-task/<%= i%>"
    // but using query we can have all the elements that we have specified in the href like using phone number and name
    // ?phone=<%= phone%>& name =<%= name%>

    // console.log(req.query);
    const id = (req.query.id);
    // console.log(id);
    const post = await Task.findById(id);
    // req.user._id will give object where as user.id will convert that to string
    if(post.user == req.user.id)
    {
    await Task.deleteOne({ _id : id});

    await Comment.deleteMany({post:id});
    // let index_to_delete  = tasks.findIndex(ta  => ta == task );
    // if(index_to_delete != -1)
    // {
    //     tasks.splice(index_to_delete, 1);
    // }
    req.flash('success' , 'Post Deleted');
    }
    return res.redirect('/');
    
}