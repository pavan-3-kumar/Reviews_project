const express = require('express')
const router = express.Router();
const homecontroller = require('../controllers/home_controller');

router.get('/' , homecontroller.home);
// when ever there is a request for users i will use my neighbour
// users.js


router.use('/users',require('./users'));
// for any further routes from heree we can access those 
// using app.use

router.use('/tasks', require('./tasks'));
router.use('/comments',require('./comments'));

module.exports = router;