const express = require('express')
const router = express.Router();
const passport = require('passport');
const taskcontroller = require('../controllers/task_controller');

router.post('/create',passport.checkAuthentication ,taskcontroller.create_task);


module.exports = router;