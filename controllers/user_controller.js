// 
const User = require('../models/user');

module.exports.profile= async function(req , res){
    // check if the cookie is present or not when ever we 
    // access the profile page
    // if(req.cookies.user_id){// here user_id is the cookie that we have created while a new user signed in
    //     const user =  await User.findById(req.cookies.user_id);
    //     if(user)
    //     {
    //         return res.render('user_profile',{
    //             title:"User_profile",
    //             user : user
    //         });
    //     }
    //     else 
    //     return res.redirect('/users/signin');
    //  }
    //   else 
    //  return res.redirect('/users/signin');
    // res.end('<h1>this handels multiple user</h1>');
    const id = req.query.id;
    // console.log(id);    
    const user =await  User.findById(id);
    // console.log(user);
  return   res.render('user_profile' , {profile_user : user});
}

module.exports.update =async function(req , res){
   
    const idd = req.query.id;
    if(req.user.id == idd){
        // console.log(req.body.name);
    await User.updateOne({_id:idd},{$set:{name : req.body.name , email:  req.body.email }});
    return res.redirect('/');
   }else{
        return res.status(404).send('unauthorized');
    }
}

// renders the sign up page
module.exports.signup = function(req, res){
    if(req.isAuthenticated())
    {
       return  res.redirect('/users/profile');
    }
    return res.render('user_signup',{title:"TODO_LIST-signup"});
}

// renders the sign in page
module.exports.signin = function(req, res){
    if(req.isAuthenticated())
    {
       return  res.redirect('/users/profile');
    }
    // console.log("addd");

    // req.flash('error' ,'Invalid UsernamePassword');
    
    return  res.render('user_signin',{title:"TODO_LIST-signin",check:null});
}

// get the signup data
module.exports.create=async function(req , res)
{
    if(req.body.password != req.body.conf_password)
    {
            req.flash('error','Re-enterd password doesnot matched');
        return res.redirect('back');
    }
    // finding whether a user exists or not by giving a email
    // as check
    const user = await User.findOne({email:req.body.email});
    // if it is new-user create an account
    if(!user)
    {
       await User.create(req.body);
       return res.redirect('/users/signin');
    }
    // if it a existing user reidirect to the signin page 
    return res.redirect('/users/signin');
}

// manual - authentication
// create a session of signin user
// module.exports.createSession = async function(req , res)
// {
//     // steps to authenticate
//     // find the user
//    const user = await User.findOne({email:req.body.email}); 
//    // if the user is found
//    if(user){
//        if(user.password != req.body.password)
//        {
//         // if the password was in correct 
//         return res.redirect('back'); 
//        }
//        // handle the session as all the info is correct
//        res.cookie('user_id' ,user._id); 
//        return res.redirect('/users/profile');
//    }
//    else{
//      // handle if user not found
//      return res.redirect('/users/signup');
//    }

// }

// authentication using passport

module.exports.createSession = async function(req , res)
{
    req.flash('success' ,'Logged Successfully')
    return res.redirect('/');
}

module.exports.destroysession = async function(req , res)
{
    // this is function in a passport
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success' ,'Logged Out');
    return res.redirect('/');
 });
 
}