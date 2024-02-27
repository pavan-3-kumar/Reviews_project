// reqiure the library
const mongoose  = require('mongoose');
// connect to database
mongoose.connect('mongodb://127.0.0.1:27017/contacts_list_db');
// acqiure the connection (to check if it is connected or not)
const db = mongoose.connection;
// error
db.on('error' , console.error.bind(console,'error connecting to db'));
// up and running then print statement 
db.once('open' , function(){
  console.log('suucesfully connected');
});

module.exports = db;