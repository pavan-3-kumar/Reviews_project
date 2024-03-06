const express = require('express');
const port = 4000;
const app = express();
const path = require('path');

const cookieParser = require('cookie-parser');
// const { execPath, title } = require('process');

const db = require('./assets/mongoose');
// used for session cookie
const session = require('express-session');
const passport= require('passport');
const passportLocal = require('./assets/passport-local-strategy');
const MongoStore = require('connect-mongo'); // to store session cookie in mongodb permenantly until sign out
const Task = require('./models/task_data');

const flash = require('connect-flash');
const customMware= require('./assets/middleware');


app.use(express.urlencoded());// middle_ware 
app.use(cookieParser());
app.use(express.static('./middle_static'));// to use static files under middle_static folder 




app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views'));

app.use(session({
    name: 'SOCIAL_CONNECT',
    // secret key - when an encryption happens there is a key to
    // encrypt and decrypt so we the key that we mentioned here
    secret : 'secretcode',
    saveUninitialized: false,
    resave: false , 
    cookie:{
        // use to give how much time that the cookie should be there
        // this is generally used for session exprieing like (TCS-CODEVITA)
        maxAge : (100000* 60 * 100 )//in milli seconds 
    },
    store : MongoStore.create({
            mongoUrl : "mongodb://127.0.0.1:27017/contacts_list_db",
            autoRemove : 'disabled'     
       })
}));

app.use(passport.initialize());
app.use(passport.session());

// when ever the express is intializing every thing i.e server is restarted
// it calls this as a middle ware which is in passport-local-strategy see there
app.use(passport.setAuthenticatedUser);
let count = 0 ;


//  app.use((req, res, next)=>{
//     console.log("middle_ware_1",count);
//     count++;
//     next();
// });
// app.use((req, res, next)=>{
//     console.log("middle_ware_2",count);
//     count++;
//     next();
// });
app.use(flash());
app.use(customMware.setFlash);
app.use('/',require('./routes')); 

// app.get('/' , async function(req , res){
// console.log("hi ra");
// return res.render('practice')

// var tasks= [];
// const cursor = Task.find({}).cursor();
// for(let t = await cursor.next();  t != null ; t =  await cursor.next())
// {
//      tasks.push(t.task);
//     //  console.log(t.task);
// }

// above cursor method also does the same thing 
// for await (const t of Task.find())
// {
//    console.log(t.task);
//    tasks.push(t.task);
// }

// var tasks = await Task.find({});
// // console.log(tasks);
//     return res.render('home',{'title':'kumar' , 'tasks':tasks});
// }); 


// app.get('/check',async function(req , res){
    
//     // const ob = req.body;
//     // const pa =Object.keys(req.body);
//     // for(let a in  pa)
    
//     const id = req.query.id;
//     const pa = await Task.findById(id);
//     if(pa.did_task)
//           await Task.updateOne({_id:id},{$set:{did_task:false}});
//         else 
//         await Task.updateOne({_id:id},{$set:{did_task:true}});
// //      if(Task.findById(id).did_task === true){
// //    await Task.findByIdAndUpdate(id,{did_task:false}); 
// // console.log("yes");
// // }
// // else {
// // await Task.findByIdAndUpdate(id,{did_task:true});
// // console.log("no");
// // }
//      res.redirect('back');
// });



// app.post('/practice' , async function(req, res){
//     // console.log(req.body.task);
//     //  name : req.body.name ,
//     // number : req.body.number
//     // tasks.push(
//     // req.body.task
//     // );
//         const added= await Task.create({task:req.body.task});
//         // console.log(added);
//     if(req.xhr){return res.status(200).json({
//         data:added  
//     });}
    
//     return res.redirect('back');
    
// });

// for deleting the task by getting the query form <a> tag

// app.get('/delete-task',async function(req,res)
// {
//     // here we can use both params and query but using the params
//     // we can get only the data realted to the parameters that we mentioned
//     // like app.get('/delet-task/task') and in home.ejs file in <a> tag href="/delete-task/<%= i%>"
//     // but using query we can have all the elements that we have specified in the href like using phone number and name
//     // ?phone=<%= phone%>& name =<%= name%>

//     // console.log(req.query);
//     const id = (req.query.id);
//     // console.log(id);
//     await Task.deleteOne({ _id : id});
//     // let index_to_delete  = tasks.findIndex(ta  => ta == task );
//     // if(index_to_delete != -1)
//     // {
//     //     tasks.splice(index_to_delete, 1);
//     // }
//     return res.redirect('back');
    
// });

app.listen(port , function(err){
 if(err){console.log("this is an error in server");return;}
    console.log("ok! server is created");
    return ; 

});

