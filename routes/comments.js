const express = require('express')
const router = express.Router();
const passport = require('passport');
const commentscontroller = require('../controllers/comments_controller');

router.post('/create_comment',passport.checkAuthentication ,commentscontroller.create_comment);
router.get('/delete_comment',passport.checkAuthentication ,commentscontroller.delete_comment);

module.exports = router;