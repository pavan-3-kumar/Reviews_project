const mongoose = require('mongoose');
const task_schema = new mongoose.Schema({
   task: {
 type : String,
 required : true
   } ,      
  //  did_task:{
  //   type : Boolean,
  //   required : true,
  //   default : false 
  // },
  // we have to link with the users right so we keep user identity also
  user:{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'// this User is the one that refers to the user.js in models
    // that we exported
  },
  // when we want to get comments of a particular post inspite of going to every post and checking the that this is from the current post or not
  // rather than this we keep an array of comments id for every post this will make quit easy to retrive the comments
  // for finding posts of a particular user we can also use this .
  comments:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
      }]
},{
  timestamps: true
});

// creating collection 
const Task = mongoose.model('Task' , task_schema);
module.exports = Task;
// hello pavan kumar