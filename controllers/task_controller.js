const Task = require('../models/task_data');

module.exports.create_task = async function(req , res){
    // console.log(req.user);
    const added= await Task.create({task:req.body.task, user : req.user._id});
    // console.log(added);
        if(req.xhr){return res.status(200).json({
            data:added 
        });}

     return res.redirect('back');   
}

