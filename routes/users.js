const express = require('express')
const router = express.Router();
const passport = require('passport');
const users_controller = require('../controllers/user_controller'); 
// checkAuthentication - this will work as a middle ware as when we access the profile
// page we need to check whether the user is signed in or not so we use this function
// from the passport-local-strategy
router.get('/profile',passport.checkAuthentication,  users_controller.profile);
router.post('/update',passport.checkAuthentication,users_controller.update);
router.get('/signup' , users_controller.signup);
router.get('/signin' , users_controller.signin);
// get signup data
router.post('/create',users_controller.create);
// get signin data  
// router.post('/createSession' , users_controller.createSession);
// use passport as a middleware to authenticate
// when the user enter the signin details then submit then this will 
// be routed
router.post('/createSession' , passport.authenticate(
    'local',
    {failureRedirect : '/users/signin'}
) ,  users_controller.createSession );

router.get('/signout', users_controller.destroysession);
module.exports = router;