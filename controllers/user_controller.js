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
  return   res.render('user_profile');
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
    return  res.render('user_signin',{title:"TODO_LIST-signin"});
}

// get the signup data
module.exports.create=async function(req , res)
{
    if(req.body.password != req.body.conf_password)
    {
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
    return res.redirect('/');
}

module.exports.destroysession = async function(req , res)
{
    // this is function in a passport
    req.logout(function(err) {
        if (err) { return next(err); }
    return res.redirect('/');
 });
}