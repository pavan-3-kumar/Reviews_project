// this is a middle ware which is called when the user is trying to log in


const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

passport.use( new LocalStrategy({
      usernameField : 'email',  
      passReqToCallback : true // this allows to add a 'req' to the below function as we reqiure this for the notifications
   
    },
  async function(req ,  email , password , done)
   { 
    // console.log("authenticated");
     const user = await User.findOne({email:email});
         if(!user || user.password != password)
         {
          // console.log(req.body);
          
          // window.alert("Invalid Username/Password");
          req.flash('error' , 'Invalid Username/Password');
            // console.log("password is incorrect");  
        return done(null , false); 
        }
        
        return done(null , user);
   }
));

// serialize i.e when a particular user is signed in 
// to decide which key is to be kept in cookie that key is id of the user form the database
// this id will be further encrypted using same secret key
passport.serializeUser(function(user , done){
    done(null , user._id);// here null means no error and sending the id as a key
}); 
 
// deserializing the user from the key in the cookie
// when the browser requests we deserialize and finds the user
// and sends the result

passport.deserializeUser(async function(id , done){
  const user = await User.findById(id);
  return done(null , user);
});


// check if the user is authenticated

passport.checkAuthentication = function(req , res , next){
   // if the user is sign in , then pass on the request to the 
   // next function(controller's action)
   if(req.isAuthenticated())
   {
    return next();
   }
   // if the user is not sign in 
   return res.redirect('/users/signin');

}

// if there is a session cookie then we will assgin it to locals else we will go to next

passport.setAuthenticatedUser = function(req , res , next){
  if(req.isAuthenticated())
  {
    // req.user contains the current signed in user from the 
    // session cookie and we are just sending this to locals for the views
    res.locals.user= req.user;
  }
 return  next();
} 


module.exports = passport;