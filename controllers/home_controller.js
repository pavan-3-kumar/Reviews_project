const Task = require('../models/task_data');

module.exports.home = async function(req , res){
   
   // in browser we named a cookie as user_id and kept value as 33 
   // console.log(req.cookies); 
   // what if we want to change the value of a cookie
   // as server is giving some change right so it is a res type
   // res.cookie('user_id  ',24);
  
   // if(req.isAuthenticated())
   // {
   //    // to show only the posts posted by the current user
   //    // var total_tasks  = await Task.find({user : req.user._id});

   //    // to show all the posts/tasks posted by all the users
   //    var total_tasks  = await Task.find({})
   //    .populate('user')
   //    .exec();
   //    // this populate('user') as we are linked each task with  
   //    // current user by using the name 'user'
   //    // poplate method will give details of the other collection
   //    // that was linked
   //    // console.log(req.user._id);
   //    // return res.render('home',{title : "HOME" ,tasks : total_tasks ,user_id : req.user._id });     
   //    return res.render('home',{title : "HOME" ,tasks : total_tasks});     
   // }
   // else{
       
   //    return res.redirect('/users/signin');
   // }
 

   // this is either a person is loged out or logged in he want to 
   // see all the posts posted by all the people and respective comments
   var total_tasks  = await Task.find({})
   .populate('user')
   .populate({
      path : 'comments',
      populate : {
         path : 'user'
      }
   })
   .exec();
   return res.render('home',{title : "HOME" ,tasks : total_tasks});     

   
   
    


}