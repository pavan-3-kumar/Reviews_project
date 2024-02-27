const mongoose = require('mongoose');
const task_schema = new mongoose.Schema({
   task: {
 type : String,
 required : true
   } ,      
   did_task:{
    type : Boolean,
    required : true,
    default : false 
  },
  // we have to link with the users right so we keep user identity also
  user:{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'// this User is the one that refers to the user.js in models
    // that we exported
  }
},{
  timestamps: true
});

// creating collection 
const Task = mongoose.model('Task' , task_schema);
module.exports = Task;